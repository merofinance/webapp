import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { Backd } from "../../lib/backd";
import { Pool, UserBalances } from "../../lib/types";

interface UserState {
  balances: UserBalances;
}

const initialState: UserState = {
  balances: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBalances: (state, action: PayloadAction<UserBalances>) => {
      state.balances = action.payload;
    },
  },
});

export const { setBalances } = userSlice.actions;

export const fetchBalances = (backd: Backd, pools: Pool[]): AppThunk => (
  dispatch
) => {
  backd
    .getBalances(pools.map((p) => p.name))
    .then((balances) => dispatch(setBalances(balances)));
};

export const selectBalances = (state: RootState) => state.user.balances;

export default userSlice.reducer;
