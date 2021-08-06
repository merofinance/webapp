import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Selector } from "../../app/store";
import { Backd } from "../../lib/backd";
import { parseTransactionReceipt, TransactionConfirmation, TransactionInfo } from "../../lib/types";
import { logout } from "../../state/accountSlice";

interface TransactionsState {
  transactions: TransactionInfo[];
}

const initialState: TransactionsState = {
  transactions: [],
};

export const fetchPendingTransactions = createAsyncThunk(
  "transactions/fetchPending",
  async ({ backd, hashes }: { backd: Backd; hashes: string[] }) => {
    const txs = await Promise.all(hashes.map((hash) => backd.provider.waitForTransaction(hash)));
    return txs.map((tx) => parseTransactionReceipt(tx));
  }
);

const handleConfirmTransaction = (
  state: TransactionsState,
  confirmation: TransactionConfirmation
) => {
  const tx = state.transactions.find((tx) => tx.hash === confirmation.hash);
  if (tx) {
    Object.assign(tx, confirmation);
  } else {
    console.warn(`trying to confirm tx not in store: ${confirmation.hash}`);
  }
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionInfo>) => {
      state.transactions.push(action.payload);
    },
    clearTransactions: (state, action: PayloadAction<void>) => {
      return initialState;
    },
    confirmTransaction: (state, action: PayloadAction<TransactionConfirmation>) =>
      handleConfirmTransaction(state, action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPendingTransactions.fulfilled, (state, action) => {
      action.payload.forEach((confirmation) => handleConfirmTransaction(state, confirmation));
    });

    builder.addCase(logout, (state, action) => {
      return initialState;
    });
  },
});

export const pendingTransactionsCount: Selector<number> = (state: RootState) => {
  return state.transactions.transactions.filter((tx) => tx.confirmations === 0).length;
};

export const pendingTransactions: Selector<TransactionInfo[]> = (state: RootState) => {
  return state.transactions.transactions.filter((tx) => tx.confirmations === 0);
};

export const transactionsCount: Selector<number> = (state: RootState) => {
  return state.transactions.transactions.length;
};

export const sortTransactions = (transactions: TransactionInfo[]): TransactionInfo[] => {
  return transactions.sort((tx1, tx2) => {
    if (tx1.blockNumber && tx2.blockNumber && tx1.blockNumber !== tx2.blockNumber) {
      return tx2.blockNumber - tx1.blockNumber;
    } else if (tx1.blockNumber && !tx2.blockNumber) {
      return 1;
    } else if (!tx1.blockNumber && tx2.blockNumber) {
      return -1;
    }
    return tx2.timestamp - tx1.timestamp;
  });
};

export const transactions: Selector<TransactionInfo[]> = (state: RootState) => {
  return sortTransactions(Array.from(state.transactions.transactions));
};

export const { addTransaction, confirmTransaction, clearTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
