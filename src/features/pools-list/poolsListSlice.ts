import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { Pool } from "../../lib";
import { Backd } from "../../lib/backd";
import { Prices } from "../../lib/types";
import { logout } from "../../state/accountSlice";
import { fetchAllowances, fetchBalances } from "../user/userSlice";

interface PoolsState {
  pools: Pool[];
  prices: Prices;
}

const initialState: PoolsState = {
  pools: [],
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

    builder.addCase(logout, (state, action) => {
      return initialState;
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
    });
  };

export const selectPools = (state: RootState) => state.pools.pools;

export const selectPrices = (state: RootState) => state.pools.prices;

export default poolsSlice.reducer;
