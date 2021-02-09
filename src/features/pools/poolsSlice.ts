import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { Pool } from "../../lib";
import { Backd } from "../../lib/backd";
import { Prices, UserBalances } from "../../lib/types";

interface PoolsState {
  pools: Pool[];
  userBalances: UserBalances;
  prices: Prices;
}

const initialState: PoolsState = {
  pools: [],
  userBalances: {}, // FIXME: this should live somewhere else in the state
  prices: {},
};

export const poolsSlice = createSlice({
  name: "pools",
  initialState,
  reducers: {
    setPools: (state, action: PayloadAction<Pool[]>) => {
      state.pools = action.payload;
    },
    setBalances: (state, action: PayloadAction<UserBalances>) => {
      state.userBalances = action.payload;
    },
    setPrices: (state, action: PayloadAction<Prices>) => {
      state.prices = action.payload;
    },
  },
});

export const { setPools, setBalances, setPrices } = poolsSlice.actions;

export const fetchPools = (backd: Backd): AppThunk => (dispatch) => {
  backd.listPools().then((pools) => dispatch(setPools(pools)));
};

export const fetchBalances = (backd: Backd, pools: Pool[]): AppThunk => (
  dispatch
) => {
  backd
    .getBalances(pools.map((p) => p.name))
    .then((balances) => dispatch(setBalances(balances)));
};

export const fetchPrices = (backd: Backd, pools: Pool[]): AppThunk => (
  dispatch
) => {
  backd
    .getPrices(pools.map((p) => p.asset))
    .then((prices) => dispatch(setPrices(prices)));
};

export const fetchState = (backd: Backd): AppThunk => (dispatch) => {
  backd.listPools().then((pools) => {
    dispatch(setPools(pools));
    dispatch(fetchBalances(backd, pools));
    dispatch(fetchPrices(backd, pools));
  });
};

export const selectPools = (state: RootState) => state.pools.pools;
export const selectPrices = (state: RootState) => state.pools.prices;
export const selectBalances = (state: RootState) => state.pools.userBalances;

export default poolsSlice.reducer;
