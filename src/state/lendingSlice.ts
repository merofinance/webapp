import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Backd } from "../lib/backd";
import { ScaledNumber } from "../lib/scaled-number";
import { Address, LendingProtocol, Loan, PlainLoan, PlainLoans } from "../lib/types";

interface LendingState {
  loans: PlainLoans;
}

const initialState: LendingState = {
  loans: {},
};

export const fetchLoans = createAsyncThunk(
  "lending/fetch-loans",
  async ({ backd, address }: { backd: Backd; address: Address }) => {
    const loans: (PlainLoan | null)[] = await Promise.all([
      backd.getLoanPosition(LendingProtocol.Aave, address),
      backd.getLoanPosition(LendingProtocol.Compound, address),
    ]);
    return { address, loans: loans.filter((loan: PlainLoan | null) => loan) as PlainLoan[] };
  }
);

export const lendingSlice = createSlice({
  name: "lending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLoans.fulfilled, (state, action) => {
      state.loans[action.payload.address] = action.payload.loans;
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

export function selectLoans(address: string | null | undefined): (state: RootState) => Loan[] {
  return (state: RootState) => {
    if (!address || !state.lending.loans[address]) return [];
    return state.lending.loans[address].map((loan: PlainLoan) => fromPlainLoan(loan)) || [];
  };
}

export default lendingSlice.reducer;
