import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { RootState, Selector } from "../app/store";
import { Backd } from "../lib/backd";
import { ETH_DUMMY_ADDRESS } from "../lib/constants";
import { PlainScaledNumber, ScaledNumber } from "../lib/scaled-number";
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
  connecting: boolean;
}

const initialState: UserState = {
  balances: {},
  allowances: {},
  connecting: false,
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

type ApproveArgs = { backd: Backd; token: Token; spender: Address; amount: ScaledNumber };
type DepositArgs = { backd: Backd; pool: Pool; amount: ScaledNumber };
type WithdrawArgs = { backd: Backd; pool: Pool; amount: ScaledNumber };
type UnstakeArgs = { backd: Backd; pool: Pool; amount: ScaledNumber };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.connecting = action.payload;
    },
    setAllowance: (
      state,
      action: PayloadAction<{ token: Token; spender: Address; amount: PlainScaledNumber }>
    ) => {
      const { spender, token, amount } = action.payload;
      if (!state.allowances[token.address]) {
        state.allowances[token.address] = {};
      }
      state.allowances[token.address][spender] = amount;
    },
    decreaseAllowance: (
      state,
      action: PayloadAction<{ token: Token; spender: Address; amount: PlainScaledNumber }>
    ) => {
      const { spender, token, amount } = action.payload;
      // NOTE: we do not want to touch "allowances" from Eth based pools
      if (token.address === ETH_DUMMY_ADDRESS) return;
      const plainAllowance = state.allowances[token.address][spender];
      if (!plainAllowance) return;

      const allowance = ScaledNumber.fromPlain(plainAllowance);
      const value = allowance.sub(ScaledNumber.fromPlain(amount));
      state.allowances[token.address][spender] = value.isNegative()
        ? new ScaledNumber().toPlain()
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

export const { setAllowance, decreaseAllowance, setConnecting } = userSlice.actions;

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

export function selectBalance(pool: Optional<Pool>): Selector<ScaledNumber | null>;
export function selectBalance(address: string): Selector<ScaledNumber | null>;
export function selectBalance(
  addressOrPool: string | Optional<Pool>
): Selector<ScaledNumber | null> {
  return (state: RootState) => {
    if (!addressOrPool) return null;

    if (typeof addressOrPool === "string") {
      const plainBalance = state.user.balances[addressOrPool];
      if (!plainBalance) return null;
      return ScaledNumber.fromPlain(plainBalance);
    }

    const plainLpTokenBalance = state.user.balances[addressOrPool.lpToken.address];
    const plainStakedBalance = state.user.balances[addressOrPool.stakerVaultAddress];
    if (!plainLpTokenBalance || !plainStakedBalance) return null;
    const lpTokenBalance = ScaledNumber.fromPlain(plainLpTokenBalance);
    const stakedBalance = ScaledNumber.fromPlain(plainStakedBalance);
    return lpTokenBalance.add(stakedBalance);
  };
}

export function selectAvailableToWithdraw(pool: Pool | null): Selector<ScaledNumber | null> {
  return (state: RootState) => {
    if (!pool) return null;

    const balance = useSelector(selectBalance(pool));
    const staked = useSelector(selectBalance(pool.stakerVaultAddress));
    if (!balance || !staked) return null;

    return balance.sub(staked);
  };
}

export function isConnecting(state: RootState): boolean {
  return state.user.connecting;
}

export function selectDepositAllowance(pool: Pool): Selector<ScaledNumber | null> {
  return (state: RootState) => {
    const plainDepositAllowance = state.user.allowances[pool.underlying.address]?.[pool.address];
    if (!plainDepositAllowance) return null;
    return ScaledNumber.fromPlain(plainDepositAllowance);
  };
}

export function selectAllowance(token: string, contract: string): Selector<ScaledNumber | null> {
  return (state: RootState) => {
    const plainAllowance = state.user.allowances[token]?.[contract];
    if (!plainAllowance) return null;
    return ScaledNumber.fromPlain(plainAllowance);
  };
}

export function selectToupAllowance(
  backd: Backd | undefined,
  pool: Pool
): Selector<ScaledNumber | null> {
  return (state: RootState) => {
    if (!backd) return null;

    const plainLpTokenAllowance =
      state.user.allowances[pool.lpToken.address]?.[backd.topupActionAddress];
    const plainVaultAllowance =
      state.user.allowances[pool.stakerVaultAddress]?.[backd.topupActionAddress];
    if (!plainLpTokenAllowance || !plainVaultAllowance) return null;
    const lpTokenAllowance = ScaledNumber.fromPlain(plainLpTokenAllowance);
    const vaultAllowance = ScaledNumber.fromPlain(plainVaultAllowance);
    return lpTokenAllowance.add(vaultAllowance);
  };
}

export default userSlice.reducer;
