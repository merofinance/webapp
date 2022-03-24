import { useSelector } from "react-redux";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlainScaledNumber, ScaledNumber } from "scaled-number";

import { RootState, Selector } from "../app/store";
import { Backd } from "../lib/backd";
import { ETH_DUMMY_ADDRESS } from "../lib/constants";
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
  PlainWithdrawalFees,
  fromPlainWithdrawalFees,
  PlainLpGaugeEarned,
  LpGaugeEarned,
  fromPlainLpGaugeEarned,
} from "../lib/types";
import { fetchPool, selectPools } from "./poolsListSlice";
import { handleTransactionConfirmation } from "../lib/transactionsUtils";

interface UserState {
  balances: PlainBalances;
  gasBankBalance: Optional<PlainScaledNumber>;
  allowances: PlainAllowances;
  withdrawalFees: PlainWithdrawalFees;
  connecting: boolean;
  lpGaugeEarned: PlainLpGaugeEarned;
}

const initialState: UserState = {
  balances: {},
  gasBankBalance: null,
  allowances: {},
  withdrawalFees: {},
  connecting: false,
  lpGaugeEarned: {},
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

export const fetchGasBankBalance = createAsyncThunk(
  "user/fetchGasBankBalance",
  async ({ backd }: { backd: Backd }) => {
    return backd.getGasBankBalance();
  }
);

export const fetchAllowances = createAsyncThunk(
  "user/fetchAllowances",
  async ({ backd, pools }: { backd: Backd; pools: Pool[] }) => {
    const queries: AllowanceQuery[] = pools
      .flatMap((pool) => [
        {
          spender: pool.address,
          token: pool.underlying,
        },
        {
          spender: backd.topupActionAddress || "",
          token: pool.lpToken,
        },
        {
          spender: backd.topupActionAddress || "",
          token: { address: pool.stakerVaultAddress, decimals: pool.underlying.decimals },
        },
      ])
      .filter((a: AllowanceQuery) => !!a.spender);
    const allowances = await backd.getAllowances(queries);
    return toPlainAllowances(allowances);
  }
);

export const fetchWithdrawalFees = createAsyncThunk(
  "user/fetchWithdrawalFees",
  async ({ backd, pools }: { backd: Backd; pools: Pool[] }) => {
    return backd.getWithdrawalFees(pools);
  }
);

export const fetchLpGaugeEarned = createAsyncThunk(
  "user/fetchLpGaugeEarned",
  async ({ backd, pools }: { backd: Backd; pools: Pool[] }) => {
    return backd.getLpGaugeEarned(pools);
  }
);

type ApproveArgs = { backd: Backd; token: Token; spender: Address; amount: ScaledNumber };
type DepositArgs = { backd: Backd; pool: Pool; amount: ScaledNumber; stake: boolean };
type WithdrawArgs = { backd: Backd; pool: Pool; amount: ScaledNumber; withdrawalFee: ScaledNumber };
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
    builder.addCase(fetchLpGaugeEarned.fulfilled, (state, action) => {
      Object.entries(action.payload).forEach((earned) => {
        // eslint-disable-next-line prefer-destructuring
        state.lpGaugeEarned[earned[0]] = earned[1];
      });
    });

    builder.addCase(fetchBalances.fulfilled, (state, action) => {
      Object.entries(action.payload).forEach((tokenAddress) => {
        // eslint-disable-next-line prefer-destructuring
        state.balances[tokenAddress[0]] = tokenAddress[1];
      });
    });

    builder.addCase(fetchGasBankBalance.fulfilled, (state, action) => {
      state.gasBankBalance = action.payload;
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

    builder.addCase(fetchWithdrawalFees.fulfilled, (state, action) => {
      Object.entries(action.payload).forEach((withdrawalFee) => {
        // eslint-disable-next-line prefer-destructuring
        state.withdrawalFees[withdrawalFee[0]] = withdrawalFee[1];
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
  async ({ backd, pool, amount, stake }: DepositArgs, { dispatch }) => {
    const tx = await backd.deposit(pool, amount, stake);
    handleTransactionConfirmation(
      tx,
      { action: "Deposit", args: { pool, amount: amount.toPlain() } },
      dispatch,
      [
        fetchBalances({ backd, pools: [pool] }),
        fetchPool({ backd, poolAddress: pool.address }),
        fetchWithdrawalFees({ backd, pools: [pool] }),
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
  async ({ backd, pool, amount, withdrawalFee }: WithdrawArgs, { dispatch }) => {
    const tx = await backd.withdraw(pool, amount, withdrawalFee);
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

export const selectEthBalance = (state: RootState): Optional<ScaledNumber> => {
  const balance = state.user.balances[ETH_DUMMY_ADDRESS];
  return balance ? ScaledNumber.fromPlain(balance) : null;
};

export const selectGasBankBalance = (state: RootState): Optional<ScaledNumber> =>
  state.user.gasBankBalance ? ScaledNumber.fromPlain(state.user.gasBankBalance) : null;

export function selectWithdrawalFee(pool: Optional<Pool>): Selector<Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const withdrawalFees = fromPlainWithdrawalFees(state.user.withdrawalFees);
    return withdrawalFees[pool.address];
  };
}

export const isConnecting = (state: RootState): boolean => {
  return state.user.connecting;
};

export const selectLpGaugeEarned = (state: RootState): LpGaugeEarned => {
  return fromPlainLpGaugeEarned(state.user.lpGaugeEarned);
};

export function selectTotalLpGaugeEarned(): Selector<Optional<ScaledNumber>> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    if (!pools) return null;
    const lpGaugeEarned = useSelector(selectLpGaugeEarned);
    return pools?.reduce(
      (a: ScaledNumber, b: Pool) =>
        lpGaugeEarned[b.address] ? a.add(lpGaugeEarned[b.address]) : a,
      new ScaledNumber()
    );
  };
}

export function selectPoolUnderlyingBalance(
  pool: Optional<Pool>
): Selector<Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const poolUnderlyingBalance = state.user.balances[pool.underlying.address];
    if (!poolUnderlyingBalance) return null;
    return ScaledNumber.fromPlain(poolUnderlyingBalance);
  };
}

export function selectPoolLpBalance(pool: Optional<Pool>): Selector<Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const poolLpBalance = state.user.balances[pool.lpToken.address];
    if (!poolLpBalance) return null;
    return ScaledNumber.fromPlain(poolLpBalance);
  };
}

export function selectDepositAllowance(pool: Pool): Selector<Optional<ScaledNumber>> {
  return (state: RootState) => {
    const plainDepositAllowance = state.user.allowances[pool.underlying.address]?.[pool.address];
    if (!plainDepositAllowance) return null;
    return ScaledNumber.fromPlain(plainDepositAllowance);
  };
}

export function selectAllowance(token: string, contract: string): Selector<Optional<ScaledNumber>> {
  return (state: RootState) => {
    const plainAllowance = state.user.allowances[token]?.[contract];
    if (!plainAllowance) return null;
    return ScaledNumber.fromPlain(plainAllowance);
  };
}

export function selectToupAllowance(
  backd: Backd | undefined,
  pool: Pool
): Selector<Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!backd || !backd.topupActionAddress) return null;
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
