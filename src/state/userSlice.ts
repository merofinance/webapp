import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlainScaledNumber, ScaledNumber } from "scaled-number";

import { RootState, Selector } from "../app/store";
import { Mero } from "../lib/mero";
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
} from "../lib/types";
import { fetchPool, selectOldPools } from "./poolsListSlice";
import { handleTransactionConfirmation } from "../lib/transactionsUtils";

interface UserState {
  balances: PlainBalances;
  gasBankBalance: Optional<PlainScaledNumber>;
  allowances: PlainAllowances;
  withdrawalFees: PlainWithdrawalFees;
  connecting: boolean;
  unstoppableDomain: Optional<string>;
}

const initialState: UserState = {
  balances: {},
  gasBankBalance: null,
  allowances: {},
  withdrawalFees: {},
  connecting: false,
  unstoppableDomain: null,
};

export const fetchBalances = createAsyncThunk(
  "user/fetchBalances",
  async ({ mero, pools }: { mero: Mero; pools: Pool[] }) => {
    const allTokens = pools.flatMap((p) => [
      p.lpToken.address,
      p.underlying.address,
      p.stakerVaultAddress,
    ]);
    const balances = await mero.getBalances(allTokens);
    return toPlainBalances(balances);
  }
);

export const fetchGasBankBalance = createAsyncThunk(
  "user/fetchGasBankBalance",
  async ({ mero }: { mero: Mero }) => {
    return mero.getGasBankBalance();
  }
);

export const fetchAllowances = createAsyncThunk(
  "user/fetchAllowances",
  async ({ mero, pools }: { mero: Mero; pools: Pool[] }) => {
    const queries: AllowanceQuery[] = pools
      .flatMap((pool) => [
        {
          spender: pool.address,
          token: pool.underlying,
        },
        {
          spender: mero.topupActionAddress || "",
          token: pool.lpToken,
        },
        {
          spender: mero.topupActionAddress || "",
          token: { address: pool.stakerVaultAddress, decimals: pool.underlying.decimals },
        },
        {
          spender: mero.poolMigrationZapAddres,
          token: pool.lpToken,
        },
      ])
      .filter((a: AllowanceQuery) => !!a.spender);
    const allowances = await mero.getAllowances(queries);
    return toPlainAllowances(allowances);
  }
);

export const fetchWithdrawalFees = createAsyncThunk(
  "user/fetchWithdrawalFees",
  async ({ mero, pools }: { mero: Mero; pools: Pool[] }) => {
    return mero.getWithdrawalFees(pools);
  }
);

type ApproveArgs = { mero: Mero; token: Token; spender: Address; amount: ScaledNumber };
type DepositArgs = { mero: Mero; pool: Pool; amount: ScaledNumber };
type OldWithdrawArgs = { mero: Mero; pool: Pool; amount: ScaledNumber };
type WithdrawArgs = { mero: Mero; pool: Pool; amount: ScaledNumber; withdrawalFee: ScaledNumber };
type UnstakeArgs = { mero: Mero; pool: Pool; amount: ScaledNumber };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUnstopppableDomain: (state, action: PayloadAction<Optional<string>>) => {
      state.unstoppableDomain = action.payload;
    },
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
  async ({ mero, token, spender, amount }: ApproveArgs, { dispatch }) => {
    const tx = await mero.approve(token, spender, amount);
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
  async ({ mero, pool, amount }: DepositArgs, { dispatch }) => {
    const tx = await mero.deposit(pool, amount);
    handleTransactionConfirmation(
      tx,
      { action: "Deposit", args: { pool, amount: amount.toPlain() } },
      dispatch,
      [
        fetchBalances({ mero, pools: [pool] }),
        fetchPool({ mero, poolAddress: pool.address }),
        fetchWithdrawalFees({ mero, pools: [pool] }),
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

export const oldWithdraw = createAsyncThunk(
  "user/oldwithdraw",
  async ({ mero, pool, amount }: OldWithdrawArgs, { dispatch }) => {
    const tx = await mero.oldWithdraw(pool, amount);
    handleTransactionConfirmation(
      tx,
      { action: "Withdraw", args: { pool, amount: amount.toPlain() } },
      dispatch,
      [fetchBalances({ mero, pools: [pool] }), fetchPool({ mero, poolAddress: pool.address })]
    );
    return tx.hash;
  }
);

export const withdraw = createAsyncThunk(
  "user/withdraw",
  async ({ mero, pool, amount, withdrawalFee }: WithdrawArgs, { dispatch }) => {
    const tx = await mero.withdraw(pool, amount, withdrawalFee);
    handleTransactionConfirmation(
      tx,
      { action: "Withdraw", args: { pool, amount: amount.toPlain() } },
      dispatch,
      [fetchBalances({ mero, pools: [pool] }), fetchPool({ mero, poolAddress: pool.address })]
    );
    return tx.hash;
  }
);

export const unstake = createAsyncThunk(
  "user/unstake",
  async ({ mero, pool, amount }: UnstakeArgs, { dispatch }) => {
    const tx = await mero.unstake(pool.stakerVaultAddress, amount);
    handleTransactionConfirmation(
      tx,
      { action: "Unstake", args: { pool, amount: amount.toPlain() } },
      dispatch,
      [fetchBalances({ mero, pools: [pool] })]
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

export function isConnecting(state: RootState): boolean {
  return state.user.connecting;
}

export const selectHasOldDeposits = (state: RootState): Optional<boolean> => {
  const pools = selectOldPools(state);
  const balances = selectBalances(state);
  if (!pools || !balances) return null;

  return pools.some((pool: Pool) => {
    const lpBalance = balances[pool.lpToken.address];
    const stakedBalance = balances[pool.stakerVaultAddress];
    return (lpBalance && !lpBalance.isZero()) || (stakedBalance && !stakedBalance.isZero());
  });
};

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

export function selectAllowances(state: RootState): PlainAllowances {
  return state.user.allowances;
}

export function selectUnstoppableDomain(state: RootState): Optional<string> {
  return state.user.unstoppableDomain;
}

export function selectAllowance(
  token: string,
  contract: string | undefined
): Selector<Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!contract) return null;
    const plainAllowance = state.user.allowances[token]?.[contract];
    if (!plainAllowance) return null;
    return ScaledNumber.fromPlain(plainAllowance);
  };
}

export function selectToupAllowance(
  mero: Mero | undefined,
  pool: Pool
): Selector<Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!mero || !mero.topupActionAddress) return null;
    const plainLpTokenAllowance =
      state.user.allowances[pool.lpToken.address]?.[mero.topupActionAddress];
    const plainVaultAllowance =
      state.user.allowances[pool.stakerVaultAddress]?.[mero.topupActionAddress];
    if (!plainLpTokenAllowance || !plainVaultAllowance) return null;
    const lpTokenAllowance = ScaledNumber.fromPlain(plainLpTokenAllowance);
    const vaultAllowance = ScaledNumber.fromPlain(plainVaultAllowance);
    return lpTokenAllowance.add(vaultAllowance);
  };
}

export default userSlice.reducer;
