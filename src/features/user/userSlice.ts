import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { Backd } from "../../lib/backd";
import { Pool, Balances } from "../../lib/types";

interface UserState {
  balances: Balances;
  allowances: Balances;
}

const initialState: UserState = {
  balances: {},
  allowances: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBalances: (state, action: PayloadAction<Balances>) => {
      state.balances = action.payload;
    },
    setAllowances: (state, action: PayloadAction<Balances>) => {
      state.allowances = action.payload;
    },
  },
});

export const { setBalances } = userSlice.actions;

export const fetchBalances = (backd: Backd, pools: Pool[]): AppThunk => (dispatch) => {
  const allTokens = pools.flatMap((p) => [p.lpToken.address, p.underlying.address]);
  backd.getBalances(allTokens).then((balances) => dispatch(setBalances(balances)));
};

export const fetchAllowances = (backd: Backd, pools: Pool[]): AppThunk => (dispatch) => {
  const allTokens = pools.flatMap((p) => [p.lpToken.address, p.underlying.address]);
  backd.getBalances(allTokens).then((balances) => dispatch(setBalances(balances)));
};

export const selectBalances = (state: RootState) => state.user.balances;

export default userSlice.reducer;
