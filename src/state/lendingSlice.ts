import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Backd } from "../lib/backd";
import { ScaledNumber } from "../lib/scaled-number";

// TODO Serialise these

export interface Lending {
  totalCollateralETH: ScaledNumber;
  totalDebtETH: ScaledNumber;
  availableBorrowsETH: ScaledNumber;
  currentLiquidationThreshold: ScaledNumber;
  healthFactor: ScaledNumber;
}

interface LendingState {
  aave?: Lending;
  compound?: Lending;
}

const initialState: LendingState = {
  aave: undefined,
  compound: undefined,
};

export const fetchAave = createAsyncThunk(
  "lending/fetch-aave",
  async ({ backd }: { backd: Backd }) => {
    return backd.getAave();
  }
);

export const fetchCompound = createAsyncThunk(
  "lending/fetch-compound",
  async ({ backd }: { backd: Backd }) => {
    return backd.getCompound();
  }
);

export const lendingSlice = createSlice({
  name: "lending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAave.fulfilled, (state, action) => {
      state.aave = action.payload;
    });
    builder.addCase(fetchCompound.fulfilled, (state, action) => {
      state.compound = action.payload;
    });
  },
});

export const selectAave = (state: RootState): Lending | undefined => state.lending.aave;

export const selectCompound = (state: RootState): Lending | undefined => state.lending.compound;

export default lendingSlice.reducer;
