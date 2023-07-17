import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScaledNumber } from "scaled-number";

import { RootState } from "../app/store";
import { Mero } from "../lib/mero";
import { Address, LendingProtocol, Loan, Optional, PlainLoan, PlainLoans } from "../lib/types";

interface LendingState {
  loans: PlainLoans;
}

const initialState: LendingState = {
  loans: {},
};

export const fetchLoans = createAsyncThunk(
  "lending/fetch-loans",
  async ({ mero, address }: { mero: Mero; address: Address }) => {
    const chainId = mero.getChainId();
    const loans = [];

    loans.push(await mero.getLoanPosition(LendingProtocol.Aave, chainId, address));
    if (chainId === 1) {
      loans.push(await mero.getLoanPosition(LendingProtocol.Compound, chainId, address));
    }

    return { address, loans: loans.filter((loan: Optional<PlainLoan>) => loan) as PlainLoan[] };
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
    ...plainLoan,
    totalCollateralETH: ScaledNumber.fromPlain(plainLoan.totalCollateralETH),
    totalDebtETH: ScaledNumber.fromPlain(plainLoan.totalDebtETH),
    availableBorrowsETH: ScaledNumber.fromPlain(plainLoan.availableBorrowsETH),
    currentLiquidationThreshold: ScaledNumber.fromPlain(plainLoan.currentLiquidationThreshold),
    healthFactor: ScaledNumber.fromPlain(plainLoan.healthFactor),
  };
};

export function selectLoans(address: Optional<string> | undefined): (state: RootState) => Loan[] {
  return (state: RootState) => {
    if (!address || !state.lending.loans[address]) return [];
    return state.lending.loans[address].map((loan: PlainLoan) => fromPlainLoan(loan)) || [];
  };
}

export default lendingSlice.reducer;
