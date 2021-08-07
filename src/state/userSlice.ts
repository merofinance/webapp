import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Selector } from "../app/store";
import { Backd } from "../lib/backd";
import { ETH_DUMMY_ADDRESS } from "../lib/constants";
import { PlainTokenValue, TokenValue } from "../lib/token-value";
import {
  Address,
  AllowanceQuery,
  Balances,
  fromPlainBalances,
  Optional,
  Pool,
  toPlainAllowances,
  toPlainBalances,
  PlainAllowances,
  PlainBalances,
  Token,
} from "../lib/types";
import { fetchPool } from "./poolsListSlice";
import { handleTransactionConfirmation } from "../lib/transactionsUtils";

interface UserState {
  balances: PlainBalances;
  allowances: PlainAllowances;
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
    const balances = await backd.getBalances(allTokens);
    return toPlainBalances(balances);
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
    const allowances = await backd.getAllowances(queries);
    return toPlainAllowances(allowances);
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
      action: PayloadAction<{ token: Token; spender: Address; amount: PlainTokenValue }>
    ) => {
      const { spender, token, amount } = action.payload;
      if (!state.allowances[token.address]) {
        state.allowances[token.address] = {};
      }
      state.allowances[token.address][spender] = amount;
    },
    decreaseAllowance: (
      state,
      action: PayloadAction<{ token: Token; spender: Address; amount: PlainTokenValue }>
    ) => {
      const { spender, token, amount } = action.payload;
      // NOTE: we do not want to touch "allowances" from Eth based pools
      if (token.address === ETH_DUMMY_ADDRESS) return;

      const allowance = TokenValue.fromPlain(state.allowances[token.address][spender]);
      const value = allowance.sub(TokenValue.fromPlain(amount));
      state.allowances[token.address][spender] = value.isNegative()
        ? new TokenValue().toPlain()
        : value.toPlain();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalances.fulfilled, (state, action) => {
      Object.entries(action.payload).forEach((tokenAddress) => {
        // eslint-disable-next-line prefer-destructuring
        state.balances[tokenAddress[0]] = tokenAddress[1];
      });
    });

    builder.addCase(fetchAllowances.fulfilled, (state, action) => {
      Object.entries(action.payload).forEach((tokenAddress) => {
        if (!state.allowances[tokenAddress[0]]) {
          state.allowances[tokenAddress[0]] = {};
        }
        Object.entries(tokenAddress[1]).forEach((spender) => {
          // eslint-disable-next-line prefer-destructuring
          state.allowances[tokenAddress[0]][spender[0]] = spender[1];
        });
      });
      Object.entries(action.payload).forEach((tokenAddress) => {
        if (!state.allowances[tokenAddress[0]]) {
          state.allowances[tokenAddress[0]] = {};
        }
        Object.entries(tokenAddress[1]).forEach((spender) => {
          // eslint-disable-next-line prefer-destructuring
          state.allowances[tokenAddress[0]][spender[0]] = spender[1];
        });
      });
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
      { action: "Approve", args: { spender, amount: amount.toPlain(), token } },
      dispatch,
      [setAllowance({ token, spender, amount: amount.toPlain() })]
    );
    return tx.hash;
  }
);

export const deposit = createAsyncThunk(
  "user/deposit",
  async ({ backd, pool, amount }: DepositArgs, { dispatch }) => {
    const tx = await backd.deposit(pool, amount);
    handleTransactionConfirmation(
      tx,
      { action: "Deposit", args: { pool, amount: amount.toPlain() } },
      dispatch,
      [
        fetchBalances({ backd, pools: [pool] }),
        fetchPool({ backd, poolAddress: pool.address }),
        decreaseAllowance({
          token: pool.underlying,
          spender: pool.address,
          amount: amount.toPlain(),
        }),
      ]
    );
    return tx.hash;
  }
);

export const withdraw = createAsyncThunk(
  "user/withdraw",
  async ({ backd, pool, amount }: WithdrawArgs, { dispatch }) => {
    const tx = await backd.withdraw(pool.address, amount);
    handleTransactionConfirmation(
      tx,
      { action: "Withdraw", args: { pool, amount: amount.toPlain() } },
      dispatch,
      [fetchBalances({ backd, pools: [pool] }), fetchPool({ backd, poolAddress: pool.address })]
    );
    return tx.hash;
  }
);

export const unstake = createAsyncThunk(
  "user/unstake",
  async ({ backd, pool, amount }: UnstakeArgs, { dispatch }) => {
    const tx = await backd.unstake(pool.stakerVaultAddress, amount);
    handleTransactionConfirmation(
      tx,
      { action: "Unstake", args: { pool, amount: amount.toPlain() } },
      dispatch,
      [fetchBalances({ backd, pools: [pool] })]
    );
    return tx.hash;
  }
);

export const selectBalances = (state: RootState): Balances =>
  fromPlainBalances(state.user.balances);

export function selectBalance(pool: Optional<Pool>): Selector<TokenValue>;
export function selectBalance(address: string): Selector<TokenValue>;
export function selectBalance(addressOrPool: string | Optional<Pool>): Selector<TokenValue> {
  return (state: RootState) => {
    if (!addressOrPool) return new TokenValue();
    if (typeof addressOrPool === "string")
      return TokenValue.fromPlain(state.user.balances[addressOrPool]);

    const lpTokenBalance = TokenValue.fromPlain(state.user.balances[addressOrPool.lpToken.address]);
    const stakedBalance = TokenValue.fromPlain(
      state.user.balances[addressOrPool.stakerVaultAddress]
    );
    return lpTokenBalance.add(stakedBalance);
  };
}

export function selectDepositAllowance(pool: Pool): Selector<TokenValue> {
  return (state: RootState) => {
    return TokenValue.fromPlain(state.user.allowances[pool.underlying.address]?.[pool.address]);
  };
}
export function selectToupAllowance(backd: Backd | undefined, pool: Pool): Selector<TokenValue> {
  return (state: RootState) => {
    if (!backd) return new TokenValue();

    const lpTokenAllowance = TokenValue.fromPlain(
      state.user.allowances[pool.lpToken.address]?.[backd.topupActionAddress]
    );
    const vaultAllowance = TokenValue.fromPlain(
      state.user.allowances[pool.stakerVaultAddress]?.[backd.topupActionAddress]
    );
    return lpTokenAllowance.add(vaultAllowance);
  };
}

export default userSlice.reducer;