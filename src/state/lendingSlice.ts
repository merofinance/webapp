import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Backd } from "../lib/backd";
import { ScaledNumber } from "../lib/scaled-number";

export interface Reserve {
  currentATokenBalance: ScaledNumber;
  currentStableDebt: ScaledNumber;
  currentVariableDebt: ScaledNumber;
  principalStableDebt: ScaledNumber;
  scaledVariableDebt: ScaledNumber;
  stableBorrowRate: ScaledNumber;
  liquidityRate: ScaledNumber;
  stableRateLastUpdated: Date;
  usageAsCollateralEnabled: boolean;
}

export interface Lending {
  totalCollateral: number;
  totalDebt: number;
  availableBorrows: number;
  currentLiquidationThreshold: number;
  healthFactor: number;
  reserves: Reserve[];
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

export const lendingSlice = createSlice({
  name: "lending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAave.fulfilled, (state, action) => {
      state.aave = action.payload;
    });
  },
});

export const selectAave = (state: RootState): Lending | undefined => state.lending.aave;

export const selectCompound = (state: RootState): Lending | undefined => state.lending.compound;

export default lendingSlice.reducer;
