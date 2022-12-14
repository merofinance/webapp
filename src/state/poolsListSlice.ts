import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScaledNumber } from "scaled-number";

import { AppThunk, RootState } from "../app/store";
import { Pool } from "../lib";
import { Mero } from "../lib/mero";
import {
  Address,
  fromPlainBalances,
  fromPlainPool,
  Optional,
  PlainPool,
  Prices,
} from "../lib/types";
import { fetchLoans } from "./lendingSlice";
import { fetchActionFees, fetchEstimatedGasUsage, fetchPositions } from "./positionsSlice";
import {
  fetchAllowances,
  fetchBalances,
  fetchGasBankBalance,
  fetchWithdrawalFees,
} from "./userSlice";
import { handleTransactionConfirmation } from "../lib/transactionsUtils";
import POOL_METADATA from "../lib/data/pool-metadata";

interface PoolsState {
  pools: PlainPool[];
  oldPools: PlainPool[];
  prices: Prices;
  loaded: boolean;
  oldLoaded: boolean;
}

const initialState: PoolsState = {
  pools: [],
  oldPools: [],
  loaded: false,
  prices: {},
  oldLoaded: false,
};

export const fetchPool = createAsyncThunk(
  "pool/fetch",
  async ({ mero, poolAddress }: { mero: Mero; poolAddress: string }) => {
    return mero.getPoolInfo(poolAddress);
  }
);

export const fetchPrices = createAsyncThunk(
  "pool/fetch-prices",
  async ({ mero, pools }: { mero: Mero; pools: Pool[] }) => {
    return mero.getPrices(pools.map((p) => p.underlying));
  }
);

export const fetchPools = createAsyncThunk("pool/fetch-all", ({ mero }: { mero: Mero }) =>
  mero.listPools()
);

export const fetchOldPools = createAsyncThunk("pool/fetch-all-old", ({ mero }: { mero: Mero }) =>
  mero.listOldPools()
);

type MigrateArgs = { mero: Mero; poolAddress: string };

export const migrate = createAsyncThunk(
  "pool/migrate",
  async ({ mero, poolAddress }: MigrateArgs, { dispatch }) => {
    const tx = await mero.migrate(poolAddress);
    handleTransactionConfirmation(tx, { action: "Migrate", args: { poolAddress } }, dispatch, [
      fetchState(mero),
    ]);
    return tx.hash;
  }
);

type MigrateAllArgs = { mero: Mero; poolAddresses: string[] };

export const migrateAll = createAsyncThunk(
  "pool/migrate-all",
  async ({ mero, poolAddresses }: MigrateAllArgs, { dispatch }) => {
    const tx = await mero.migrateAll(poolAddresses);
    handleTransactionConfirmation(tx, { action: "MigrateAll", args: { poolAddresses } }, dispatch, [
      fetchState(mero),
    ]);
    return tx.hash;
  }
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

    builder.addCase(fetchOldPools.fulfilled, (state, action) => {
      state.oldPools = action.payload;
      state.oldLoaded = true;
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
  (mero: Mero): AppThunk =>
  (dispatch) => {
    dispatch(fetchOldPools({ mero })).then((v) => {
      if (v.meta.requestStatus !== "fulfilled") return;
      const pools = v.payload as Pool[];
      dispatch(fetchBalances({ mero, pools }));
      dispatch(fetchAllowances({ mero, pools }));
    });
    dispatch(fetchPools({ mero })).then((v) => {
      if (v.meta.requestStatus !== "fulfilled") return;
      const pools = (v.payload as PlainPool[]).map(fromPlainPool);
      dispatch(fetchBalances({ mero, pools }));
      dispatch(fetchPrices({ mero, pools }));
      dispatch(fetchAllowances({ mero, pools }));
      dispatch(fetchWithdrawalFees({ mero, pools }));
    });
    mero.currentAccount().then((address: Address) => dispatch(fetchLoans({ mero, address })));
    dispatch(fetchPositions({ mero }));
    dispatch(fetchEstimatedGasUsage({ mero }));
    dispatch(fetchActionFees({ mero }));
    dispatch(fetchGasBankBalance({ mero }));
  };

export const selectPoolsLoaded = (state: RootState): boolean => state.pools.loaded;

export const selectPools = (state: RootState): Optional<Pool[]> => {
  if (!state.pools.loaded) return null;
  return state.pools.pools
    .map((plainPool: PlainPool) => fromPlainPool(plainPool))
    .filter((pool: Pool) => {
      if (!POOL_METADATA.find((m) => m.symbol === pool.underlying.symbol)) return false;
      return true;
    });
};

export const selectOldPools = (state: RootState): Optional<Pool[]> => {
  if (!state.pools.oldLoaded) return null;
  return state.pools.oldPools
    .map((plainPool: PlainPool) => fromPlainPool(plainPool))
    .filter((pool: Pool) => {
      if (!POOL_METADATA.find((m) => m.symbol === pool.underlying.symbol)) return false;
      return true;
    });
};

export const selectDepositedPools = (state: RootState): Optional<Pool[]> => {
  const pools = selectPools(state);
  if (!pools) return null;
  if (
    pools.some(
      (pool: Pool) =>
        !state.user.balances[pool.lpToken.address] || !state.user.balances[pool.stakerVaultAddress]
    )
  )
    return null;
  return pools.filter(
    (pool: Pool) =>
      !fromPlainBalances(state.user.balances)[pool.lpToken.address]?.isZero() ||
      !fromPlainBalances(state.user.balances)[pool.stakerVaultAddress]?.isZero()
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

export default poolsSlice.reducer;
