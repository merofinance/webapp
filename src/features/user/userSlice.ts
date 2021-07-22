import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Selector } from "../../app/store";
import { Backd } from "../../lib/backd";
import { ETH_DUMMY_ADDRESS } from "../../lib/constants";
import { TokenValue } from "../../lib/token-value";
import { Address, AllowanceQuery, Balances, Optional, Pool, Token } from "../../lib/types";
import { fetchPool } from "../pools-list/poolsListSlice";
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
    const allTokens = pools.flatMap((p) => [
      p.lpToken.address,
      p.underlying.address,
      p.stakerVaultAddress,
    ]);
    return backd.getBalances(allTokens);
  }
);

export const fetchAllowances = createAsyncThunk(
  "user/fetchAllowances",
  async ({ backd, pools }: { backd: Backd; pools: Pool[] }) => {
    const queries: AllowanceQuery[] = pools.flatMap((pool) => [
      {
        spender: pool.address,
        token: pool.underlying,
      },
      {
        spender: backd.topupActionAddress,
        token: pool.lpToken,
      },
      {
        spender: backd.topupActionAddress,
        token: { address: pool.stakerVaultAddress, decimals: pool.underlying.decimals },
      },
    ]);
    return backd.getAllowances(queries);
  }
);

type ApproveArgs = { backd: Backd; token: Token; spender: Address; amount: TokenValue };
type DepositArgs = { backd: Backd; pool: Pool; amount: TokenValue };
type WithdrawArgs = { backd: Backd; pool: Pool; amount: TokenValue };
type UnstakeArgs = { backd: Backd; pool: Pool; amount: TokenValue };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllowance: (
      state,
      action: PayloadAction<{ token: Token; spender: Address; amount: TokenValue }>
    ) => {
      const { spender, token, amount } = action.payload;
      if (!state.allowances[token.address]) {
        state.allowances[token.address] = {};
      }
      state.allowances[token.address][spender] = amount;
    },
    decreaseAllowance: (
      state,
      action: PayloadAction<{ token: Token; spender: Address; amount: TokenValue }>
    ) => {
      const { spender, token, amount } = action.payload;
      // NOTE: we do not want to touch "allowances" from Eth based pools
      if (token.address === ETH_DUMMY_ADDRESS) return;

      const allowance = state.allowances[token.address][spender] || new TokenValue(0);
      const value = allowance.value.sub(amount.value);
      state.allowances[token.address][spender] = value.isNegative()
        ? new TokenValue(0)
        : new TokenValue(value, allowance.decimals);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalances.fulfilled, (state, action) => {
      for (const tokenAddress in action.payload) {
        state.balances[tokenAddress] = action.payload[tokenAddress];
      }
    });

    builder.addCase(fetchAllowances.fulfilled, (state, action) => {
      for (const tokenAddress in action.payload) {
        if (!state.allowances[tokenAddress]) {
          state.allowances[tokenAddress] = {};
        }
        for (const spender in action.payload[tokenAddress]) {
          state.allowances[tokenAddress][spender] = action.payload[tokenAddress][spender];
        }
      }
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
    const tx = await backd.deposit(pool, amount);
    handleTransactionConfirmation(tx, { action: "Deposit", args: { pool, amount } }, dispatch, [
      fetchBalances({ backd, pools: [pool] }),
      fetchPool({ backd, poolAddress: pool.address }),
      decreaseAllowance({ token: pool.underlying, spender: pool.address, amount }),
    ]);
    return tx.hash;
  }
);

export const withdraw = createAsyncThunk(
  "user/withdraw",
  async ({ backd, pool, amount }: WithdrawArgs, { dispatch }) => {
    const tx = await backd.withdraw(pool.address, amount);
    handleTransactionConfirmation(tx, { action: "Withdraw", args: { pool, amount } }, dispatch, [
      fetchBalances({ backd, pools: [pool] }),
      fetchPool({ backd, poolAddress: pool.address }),
    ]);
    return tx.hash;
  }
);

export const unstake = createAsyncThunk(
  "user/unstake",
  async ({ backd, pool, amount }: UnstakeArgs, { dispatch }) => {
    const tx = await backd.unstake(pool.stakerVaultAddress, amount);
    handleTransactionConfirmation(tx, { action: "Unstake", args: { pool, amount } }, dispatch, [
      fetchBalances({ backd, pools: [pool] }),
    ]);
    return tx.hash;
  }
);

export const selectBalances = (state: RootState) => state.user.balances;

export function selectBalance(pool: Optional<Pool>): Selector<TokenValue>;
export function selectBalance(address: string): Selector<TokenValue>;
export function selectBalance(addressOrPool: string | Optional<Pool>): Selector<TokenValue> {
  return (state: RootState) => {
    if (!addressOrPool) return new TokenValue(0);
    if (typeof addressOrPool === "string")
      return state.user.balances[addressOrPool] || new TokenValue(0);

    const lpTokenBalance = state.user.balances[addressOrPool.lpToken.address] || new TokenValue(0);
    const stakedBalance =
      state.user.balances[addressOrPool.stakerVaultAddress] || new TokenValue(0);

    const newValue = lpTokenBalance.value.add(stakedBalance.value);
    return new TokenValue(newValue, lpTokenBalance.decimals);
  };
}

export function selectDepositAllowance(pool: Pool): Selector<TokenValue> {
  return (state: RootState) => {
    return state.user.allowances[pool.underlying.address]?.[pool.address] || 0;
  };
}
export function selectToupAllowance(backd: Backd | undefined, pool: Pool): Selector<TokenValue> {
  return (state: RootState) => {
    if (!backd) return new TokenValue(0);

    const lpTokenAllowance =
      state.user.allowances[pool.lpToken.address]?.[backd.topupActionAddress] || new TokenValue(0);
    const vaultAllowance =
      state.user.allowances[pool.stakerVaultAddress]?.[backd.topupActionAddress] ||
      new TokenValue(0);

    const newValue = lpTokenAllowance.value.add(vaultAllowance.value);
    return new TokenValue(newValue, lpTokenAllowance.decimals);
  };
}

export default userSlice.reducer;
