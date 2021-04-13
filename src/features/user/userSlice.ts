import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Selector } from "../../app/store";
import { Backd } from "../../lib/backd";
import { Address, Balances, Optional, Pool, Token } from "../../lib/types";
import { getAddress } from "../pool/selectors";
import { handleTransactionConfirmation } from "../transactions-list/transactionsUtils";

interface UserState {
  balances: Balances;
  allowances: Record<string, Balances>;
}

const initialState: UserState = {
  balances: {},
  allowances: {},
};

export const fetchBalances = createAsyncThunk(
  "user/fetchBalances",
  async ({ backd, pools }: { backd: Backd; pools: Pool[] }) => {
    const allTokens = pools.flatMap((p) => [p.lpToken.address, p.underlying.address]);
    return backd.getBalances(allTokens);
  }
);

export const fetchAllowances = createAsyncThunk(
  "user/fetchAllowances",
  async ({ backd, pools }: { backd: Backd; pools: Pool[] }) => {
    const queries = pools.map((pool) => ({ spender: pool.address, token: pool.underlying }));
    return backd.getAllowances(queries);
  }
);

type ApproveArgs = { backd: Backd; token: Token; spender: Address; amount: number };
type DepositArgs = { backd: Backd; pool: Pool; amount: number };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllowance: (
      state,
      action: PayloadAction<{ token: Token; spender: Address; amount: number }>
    ) => {
      const { spender, token, amount } = action.payload;
      if (!state.allowances[token.address]) {
        state.allowances[token.address] = {};
      }
      state.allowances[token.address][spender] = amount;
    },
    decreaseAllowance: (
      state,
      action: PayloadAction<{ token: Token; spender: Address; amount: number }>
    ) => {
      const { spender, token, amount } = action.payload;
      const allowance = state.allowances[token.address][spender] || 0;
      state.allowances[token.address][spender] = Math.max(0, allowance - amount);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalances.fulfilled, (state, action) => {
      state.balances = action.payload;
    });

    builder.addCase(fetchAllowances.fulfilled, (state, action) => {
      state.allowances = action.payload;
    });
  },
});

export const { setAllowance, decreaseAllowance } = userSlice.actions;

export const approve = createAsyncThunk(
  "user/approve",
  async ({ backd, token, spender, amount }: ApproveArgs, { dispatch }) => {
    const tx = await backd.approve(token, spender, amount);
    handleTransactionConfirmation(
      tx,
      { action: "Approve", args: { spender, amount, token } },
      dispatch,
      [setAllowance({ token, spender, amount })]
    );
    return tx.hash;
  }
);

export const deposit = createAsyncThunk(
  "user/deposit",
  async ({ backd, pool, amount }: DepositArgs, { dispatch }) => {
    const tx = await backd.deposit(pool.address, amount);
    handleTransactionConfirmation(tx, { action: "Deposit", args: { pool, amount } }, dispatch, [
      fetchBalances({ backd, pools: [pool] }),
      decreaseAllowance({ token: pool.underlying, spender: pool.address, amount }),
    ]);
    return tx.hash;
  }
);

export const selectBalances = (state: RootState) => state.user.balances;

export function selectBalance(pool: Optional<Pool>): Selector<number>;
export function selectBalance(address: string): Selector<number>;
export function selectBalance(addressOrPool: string | Optional<Pool>): Selector<number> {
  return (state: RootState) => {
    const address = getAddress(addressOrPool);
    return (address && state.user.balances[address]) || 0;
  };
}

export function selectPoolAllowance(pool: Optional<Pool>): Selector<number> {
  return (state: RootState) => {
    if (!pool) return 0;
    return state.user.allowances[pool.underlying.address]?.[pool.address] || 0;
  };
}

export default userSlice.reducer;
