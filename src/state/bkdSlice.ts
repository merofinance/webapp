import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app/store";
import { Backd } from "../lib/backd";
import { Optional, Token } from "../lib/types";

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

export const selectBkdToken = (state: RootState): Optional<Token> => state.bkd.token;

export default bkdSlice.reducer;
