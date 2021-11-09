import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { boolean } from "yup/lib/locale";
import { AppThunk, RootState } from "../app/store";
import { Pool } from "../lib";
import { Backd } from "../lib/backd";
import { Address, fromPlainBalances, Prices } from "../lib/types";
import { fetchLoans } from "./lendingSlice";
import { fetchPositions } from "./positionsSlice";
import { fetchAllowances, fetchBalances } from "./userSlice";

interface PoolsState {
  pools: Pool[];
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
    backd.currentAccount().then((address: Address) => dispatch(fetchLoans({ backd, address })));
    dispatch(fetchPools({ backd })).then((v) => {
      if (v.meta.requestStatus !== "fulfilled") return;
      const pools = v.payload as Pool[];
      dispatch(fetchBalances({ backd, pools }));
      dispatch(fetchPrices({ backd, pools }));
      dispatch(fetchAllowances({ backd, pools }));
    });
    dispatch(fetchPositions({ backd }));
  };

export const selectPoolsLoaded = (state: RootState): boolean => state.pools.loaded;

export const selectPools = (state: RootState): Pool[] | null =>
  state.pools.loaded ? state.pools.pools : null;

export const selectDepositedPools = (state: RootState): Pool[] | null =>
  state.pools.loaded
    ? state.pools.pools.filter(
        (pool: Pool) => !fromPlainBalances(state.user.balances)[pool.lpToken.address]?.isZero()
      )
    : null;

export const selectPrices = (state: RootState): Prices => state.pools.prices;

export const selectEthPrice = (state: RootState): number | null => state.pools.prices.ETH;

export const selectAverageApy = (state: RootState): number | null =>
  state.pools.pools.reduce((a: number, b: Pool) => a + b.apy, 0) / state.pools.pools.length;

export default poolsSlice.reducer;
