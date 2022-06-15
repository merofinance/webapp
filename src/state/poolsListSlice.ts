import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { ScaledNumber } from "scaled-number";
import { useSelector } from "react-redux";

import { AppThunk, RootState } from "../app/store";
import { Pool } from "../lib";
import { Backd } from "../lib/backd";
import {
  Address,
  fromPlainBalances,
  fromPlainPool,
  Optional,
  PlainPool,
  Position,
  Prices,
} from "../lib/types";
import { fetchLoans } from "./lendingSlice";
import { ACTIONS_LIVE, INFURA_ID, STAKING_LIVE } from "../lib/constants";
import { createBackd } from "../lib/factory";
import {
  fetchActionFees,
  fetchEstimatedGasUsage,
  fetchPositions,
  selectPositions,
  setPositionsLoaded,
} from "./positionsSlice";
import {
  fetchAllowances,
  fetchBalances,
  fetchGasBankBalance,
  fetchKeeperGaugeEarned,
  fetchLpGaugeEarned,
  fetchWithdrawalFees,
  selectBalances,
} from "./userSlice";
import poolMetadata from "../lib/data/pool-metadata";
import { fetchBkdToken } from "./bkdSlice";

interface PoolsState {
  pools: PlainPool[];
  prices: Prices;
  loaded: boolean;
}

const initialState: PoolsState = {
  pools: [],
  loaded: false,
  prices: {},
};

export const fetchPool = createAsyncThunk(
  "pool/fetch",
  async ({ backd, poolAddress }: { backd: Backd; poolAddress: string }) => {
    return backd.getPoolInfo(poolAddress);
  }
);

export const fetchPrices = createAsyncThunk(
  "pool/fetch-prices",
  async ({ backd, pools }: { backd: Backd; pools: Pool[] }) => {
    return backd.getPrices(pools.map((p) => p.underlying.symbol));
  }
);

export const fetchPools = createAsyncThunk("pool/fetch-all", ({ backd }: { backd: Backd }) =>
  backd.listPools()
);

export const poolsSlice = createSlice({
  name: "pools",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPools.fulfilled, (state, action) => {
      state.pools = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchPool.fulfilled, (state, action) => {
      const index = state.pools.findIndex((pool) => pool.address === action.payload.address);
      if (index >= 0) {
        state.pools[index] = action.payload;
      } else {
        state.pools.push(action.payload);
      }
    });

    builder.addCase(fetchPrices.fulfilled, (state, action) => {
      state.prices = action.payload;
    });
  },
});

export const fetchState =
  (backd: Backd): AppThunk =>
  (dispatch) => {
    dispatch(fetchPools({ backd })).then((v) => {
      if (v.meta.requestStatus !== "fulfilled") return;
      const pools = v.payload as Pool[];
      dispatch(fetchBalances({ backd, pools }));
      dispatch(fetchPrices({ backd, pools }));
      dispatch(fetchAllowances({ backd, pools }));
      dispatch(fetchWithdrawalFees({ backd, pools }));
      if (STAKING_LIVE || chainId === 42) {
        dispatch(fetchLpGaugeEarned({ backd, pools }));
        dispatch(fetchKeeperGaugeEarned({ backd, pools }));
      }
    });
    dispatch(fetchBkdToken({ backd }));
    const chainId = backd.getChainId();
    if (ACTIONS_LIVE || chainId === 42) {
      backd.currentAccount().then((address: Address) => dispatch(fetchLoans({ backd, address })));
      dispatch(fetchPositions({ backd }));
      dispatch(fetchEstimatedGasUsage({ backd }));
      dispatch(fetchActionFees({ backd }));
      dispatch(fetchGasBankBalance({ backd }));
    } else {
      dispatch(setPositionsLoaded());
    }
  };

export const fetchPreviewState = (): AppThunk => (dispatch) => {
  const provider = new ethers.providers.InfuraProvider(1, INFURA_ID);
  const backd = createBackd(provider, { chainId: 1 });
  dispatch(fetchPools({ backd })).then((v) => {
    if (v.meta.requestStatus !== "fulfilled") return;
    const pools = v.payload as Pool[];
    dispatch(fetchPrices({ backd, pools }));
  });
};

export const selectPoolsLoaded = (state: RootState): boolean => state.pools.loaded;

export const selectPools = (state: RootState): Optional<Pool[]> => {
  if (!state.pools.loaded) return null;
  return state.pools.pools
    .map((plainPool: PlainPool) => fromPlainPool(plainPool))
    .filter((pool: Pool) => {
      if (!poolMetadata[pool.underlying.symbol]) return false;
      return true;
    });
};

export const selectDepositedPools = (state: RootState): Optional<Pool[]> => {
  const pools = selectPools(state);
  if (!pools) return null;
  if (pools.some((pool: Pool) => !state.user.balances[pool.lpToken.address])) return null;
  return pools.filter(
    (pool: Pool) => !fromPlainBalances(state.user.balances)[pool.lpToken.address]?.isZero()
  );
};

export const selectPrices = (state: RootState): Prices => state.pools.prices;

export const selectEthPrice = (state: RootState): Optional<number> => state.pools.prices.ETH;

export const selectEthPool = (state: RootState): Optional<Pool> => {
  const pools = selectPools(state);
  if (!pools) return null;
  return pools.find((pool: Pool) => pool.underlying.symbol.toLowerCase() === "eth") || null;
};

export function selectPool(poolName: string | undefined): (state: RootState) => Optional<Pool> {
  return (state: RootState) => {
    const pools = selectPools(state);
    if (!poolName || !pools) return null;
    return pools.find((p) => p.lpToken.symbol.toLowerCase() === poolName.toLowerCase()) || null;
  };
}

export function selectPrice(pool: Optional<Pool>): (state: RootState) => Optional<number> {
  return (state: RootState) => (pool ? state.pools.prices[pool.underlying.symbol] : null);
}

export const selectAverageApy = (state: RootState): Optional<ScaledNumber> => {
  const pools = selectPools(state);
  if (!pools) return null;
  let poolCount = 0;
  let total = new ScaledNumber();
  for (let i = 0; i < pools.length; i++) {
    const pool = pools[i];
    if (!pool.isPaused) {
      const { apy } = pool;
      if (!apy) return null;
      total = total.add(apy);
      poolCount++;
    }
  }
  return total.div(poolCount);
};

export function selectUserWeightedAverageApy(): (state: RootState) => Optional<ScaledNumber> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const balances = useSelector(selectBalances);
    const prices = useSelector(selectPrices);
    const positions = useSelector(selectPositions);
    if (!pools || !balances || !prices || !positions) return null;
    let totalBalance = new ScaledNumber();
    let totalApy = new ScaledNumber();
    for (let i = 0; i < pools.length; i++) {
      const { apy } = pools[i];
      const price = prices[pools[i].underlying.symbol];
      if (!apy || !price) return null;
      const usersPoolLpHeld = balances[pools[i].lpToken.address];
      const usersPoolLpStaked = balances[pools[i].stakerVaultAddress];
      const poolPositions = positions
        .filter((p) => p.actionToken === pools[i].underlying.address)
        .map((position: Position) => position);
      let usersPoolLpLocked = new ScaledNumber();
      for (let i = 0; i < poolPositions.length; i++) {
        usersPoolLpLocked = usersPoolLpLocked.add(
          poolPositions[i].depositTokenBalance.mul(pools[i].exchangeRate)
        );
      }
      if (!usersPoolLpHeld || !usersPoolLpStaked || !usersPoolLpLocked) return null;
      const totalLpEverywhere = usersPoolLpHeld.add(usersPoolLpStaked).add(usersPoolLpLocked);
      const totalUnderlying = totalLpEverywhere.mul(pools[i].exchangeRate);
      const totalUsdValue = totalUnderlying.mul(price);
      totalApy = totalApy.add(apy.mul(totalUsdValue));
      totalBalance = totalBalance.add(totalUsdValue);
    }
    return totalApy.div(totalBalance);
  };
}

export default poolsSlice.reducer;
