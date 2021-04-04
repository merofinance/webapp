import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionDescription } from "../../lib/types";

interface TransactionsState {
  pendingTransactions: TransactionDescription[];
}

const initialState: TransactionsState = {
  pendingTransactions: [],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionDescription>) => {
      state.pendingTransactions.push(action.payload);
    },
  },
});
