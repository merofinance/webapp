import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app/store";
import { Backd } from "../lib/backd";
import { handleTransactionConfirmation } from "../lib/transactionsUtils";
import { Optional, Token, Pool } from "../lib/types";
import { fetchLpGaugeEarned } from "./userSlice";

interface BkdState {
  token: Optional<Token>;
}

const initialState: BkdState = {
  token: null,
};

export const fetchBkdToken = createAsyncThunk(
  "bkd/fetchBkdToken",
  async ({ backd }: { backd: Backd }) => {
    return backd.getBkdToken();
  }
);

export const bkdSlice = createSlice({
  name: "bkd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBkdToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const claimRewards = createAsyncThunk(
  "bkd/claimRewards",
  async ({ backd, pool }: { backd: Backd; pool: Pool }, { dispatch }) => {
    const tx = await backd.claimRewards(pool);
    handleTransactionConfirmation(tx, { action: "Claim Rewards", args: { pool } }, dispatch, [
      fetchLpGaugeEarned({ backd, pools: [pool] }),
    ]);
    return tx.hash;
  }
);

export const selectBkdToken = (state: RootState): Optional<Token> => state.bkd.token;

export default bkdSlice.reducer;
