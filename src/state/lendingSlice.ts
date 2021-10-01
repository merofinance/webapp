import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Backd } from "../lib/backd";
import { ScaledNumber } from "../lib/scaled-number";

export interface Loan {
  protocol: string;
  totalCollateralETH: ScaledNumber;
  totalDebtETH: ScaledNumber;
  availableBorrowsETH: ScaledNumber;
  currentLiquidationThreshold: ScaledNumber;
  healthFactor: ScaledNumber;
}

interface LendingState {
  loans: Loan[];
}

const initialState: LendingState = {
  loans: [],
};

export const fetchLoans = createAsyncThunk(
  "lending/fetch-loans",
  async ({ backd }: { backd: Backd }) => {
    const loans: Loan[] = [];
    const [aave, compound] = await Promise.all([backd.getAave(), backd.getCompound()]);
    if (aave) loans.push(aave);
    if (compound) loans.push(compound);
    return loans;
  }
);

export const lendingSlice = createSlice({
  name: "lending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLoans.fulfilled, (state, action) => {
      state.loans = action.payload;
    });
  },
});

export const selectLoans = (state: RootState): Loan[] => state.lending.loans;

export default lendingSlice.reducer;
