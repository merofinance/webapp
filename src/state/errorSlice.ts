import { CaseReducer, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { logout } from "../state/accountSlice";
import { fetchPool, fetchPools, fetchPrices } from "./poolsListSlice";
import {
  fetchPositions,
  registerPosition,
  removePosition,
} from "../features/positions/positionsSlice";
import { fetchPendingTransactions } from "../features/transactions-list/transactionsSlice";
import { deposit, fetchAllowances, fetchBalances, withdraw } from "../features/user/userSlice";

interface ErrorState {
  error: string;
}

const initialState: ErrorState = { error: "" };

const handleError: CaseReducer<ErrorState, any> = (
  state: ErrorState,
  action: PayloadAction<unknown, any, any, SerializedError>
): ErrorState => {
  return { error: action.error.message!! };
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<{ error: string }>) => {
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

    builder.addCase(logout, (state, action) => initialState);
  },
});

export const { setError } = errorSlice.actions;

export const selectError = (state: RootState) => state.error.error;

export default errorSlice.reducer;
