import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Backd } from "../lib/backd";
import { ScaledNumber } from "../lib/scaled-number";
import { LendingProtocol, Loan, PlainLoan } from "../lib/types";

interface LendingState {
  loans: PlainLoan[];
}

const initialState: LendingState = {
  loans: [],
};

export const fetchLoans = createAsyncThunk(
  "lending/fetch-loans",
  async ({ backd }: { backd: Backd }) => {
    const loans: PlainLoan[] = [];
    const [aave, compound] = await Promise.all([
      backd.getLoanPosition(LendingProtocol.Aave),
      backd.getLoanPosition(LendingProtocol.Compound),
    ]);
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

export const fromPlainLoan = (plainLoan: PlainLoan): Loan => {
  return {
    protocol: plainLoan.protocol,
    totalCollateralETH: ScaledNumber.fromPlain(plainLoan.totalCollateralETH),
    totalDebtETH: ScaledNumber.fromPlain(plainLoan.totalDebtETH),
    availableBorrowsETH: ScaledNumber.fromPlain(plainLoan.availableBorrowsETH),
    currentLiquidationThreshold: ScaledNumber.fromPlain(plainLoan.currentLiquidationThreshold),
    healthFactor: ScaledNumber.fromPlain(plainLoan.healthFactor),
  };
};

export const selectLoans = (state: RootState): Loan[] =>
  state.lending.loans.map((loan: PlainLoan) => fromPlainLoan(loan));

export default lendingSlice.reducer;
