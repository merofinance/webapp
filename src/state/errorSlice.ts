import { CaseReducer, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import * as Sentry from "@sentry/browser";

import { RootState } from "../app/store";
import { ErrorState } from "../app/errors";
import { fetchPool, fetchPools, fetchPrices } from "./poolsListSlice";
import { fetchPositions, registerPosition, removePosition } from "./positionsSlice";
import { fetchPendingTransactions } from "./transactionsSlice";
import { deposit, fetchAllowances, fetchBalances, withdraw } from "./userSlice";

const IGNORED_ERRORS: string[] = [
  "This request is not supported because your node is running with state pruning. Run with --pruning=archive.",
];

const initialState: ErrorState = { message: "" };

const handleError: CaseReducer<ErrorState, any> = (
  state: ErrorState,
  action: PayloadAction<unknown, any, any, SerializedError>
): ErrorState => {
  Sentry.captureException(action.error);
  if (!action.error.message) throw Error("Missing error message when handing error");
  if (IGNORED_ERRORS.includes(action.error.message)) return state;
  return { message: action.error.message };
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorState>) => {
      if (IGNORED_ERRORS.includes(action.payload.message)) return state;
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalances.rejected, handleError);
    builder.addCase(fetchAllowances.rejected, handleError);
    builder.addCase(fetchPool.rejected, handleError);
    builder.addCase(fetchPendingTransactions.rejected, handleError);
    builder.addCase(fetchPrices.rejected, handleError);
    builder.addCase(fetchPools.rejected, handleError);
    builder.addCase(deposit.rejected, handleError);
    builder.addCase(withdraw.rejected, handleError);
    builder.addCase(fetchPositions.rejected, handleError);
    builder.addCase(registerPosition.rejected, handleError);
    builder.addCase(removePosition.rejected, handleError);
  },
});

export const { setError } = errorSlice.actions;

export const selectError = (state: RootState): ErrorState => state.error;

export default errorSlice.reducer;
