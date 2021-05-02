import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { Pool } from "../../lib";
import { Backd } from "../../lib/backd";
import { Prices } from "../../lib/types";
import { logout } from "../account/accountSlice";
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

export const poolsSlice = createSlice({
  name: "pools",
  initialState,
  reducers: {
    setPools: (state, action: PayloadAction<Pool[]>) => {
      state.pools = action.payload;
    },
    setPrices: (state, action: PayloadAction<Prices>) => {
      state.prices = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPool.fulfilled, (state, action) => {
      const index = state.pools.findIndex((pool) => pool.address === action.payload.address);
      if (index >= 0) {
        state.pools[index] = action.payload;
      } else {
        state.pools.push(action.payload);
      }
    });

    builder.addCase(logout, (state, action) => {
      return initialState;
    });
  },
});

export const { setPools, setPrices } = poolsSlice.actions;

export const fetchPools = (backd: Backd): AppThunk => (dispatch) => {
  backd.listPools().then((pools) => dispatch(setPools(pools)));
};

export const fetchPrices = (backd: Backd, pools: Pool[]): AppThunk => (dispatch) => {
  backd
    .getPrices(pools.map((p) => p.underlying.symbol))
    .then((prices) => dispatch(setPrices(prices)));
};

export const fetchState = (backd: Backd): AppThunk => (dispatch) => {
  backd.listPools().then((pools) => {
    dispatch(setPools(pools));
    dispatch(fetchBalances({ backd, pools }));
    dispatch(fetchPrices(backd, pools));
    dispatch(fetchAllowances({ backd, pools }));
  });
};

export const selectPools = (state: RootState) => state.pools.pools;
export const selectPrices = (state: RootState) => state.pools.prices;

export default poolsSlice.reducer;
