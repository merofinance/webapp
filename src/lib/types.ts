import { TransactionReceipt } from "@ethersproject/providers";
import fromEntries from "fromentries";
import { providers, Signer } from "ethers";

import { PlainScaledNumber, ScaledNumber } from "./scaled-number";

export type Optional<T> = T | null;

export interface Token {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
}

export interface GenericPool<T> {
  address: string;
  apy: Optional<T>;
  exchangeRate: T;
  feeDecreasePeriod: T;
  lpToken: Token;
  maxWithdrawalFee: T;
  minWithdrawalFee: T;
  name: string;
  stakerVaultAddress: string;
  totalAssets: T;
  underlying: Token;
  depositCap: T;
}

export type Pool = GenericPool<ScaledNumber>;
export type PlainPool = GenericPool<PlainScaledNumber>;

export const fromPlainPool = (plainPool: PlainPool): Pool => {
  return transformPool(plainPool, (plainScaledNumber: PlainScaledNumber) =>
    ScaledNumber.fromPlain(plainScaledNumber)
  );
};

interface GenericPosition<T> {
  protocol: string;
  account: Address;
  threshold: T;
  singleTopUp: T;
  maxTopUp: T;
  priorityFee: T;
  maxGasPrice: T;
  actionToken: Address;
  depositToken: Address;
}

export type Position = GenericPosition<ScaledNumber>;
export type PlainPosition = GenericPosition<PlainScaledNumber>;

export enum LendingProtocol {
  Aave = "Aave",
  Compound = "Compound",
}

export interface LendingProtocolProvider {
  getPosition(
    address: Address,
    provider: Signer | providers.Provider
  ): Promise<Optional<PlainLoan>>;
}

interface GenericLoan<T> {
  protocol: LendingProtocol;
  totalCollateralETH: T;
  totalDebtETH: T;
  availableBorrowsETH: T;
  currentLiquidationThreshold: T;
  healthFactor: T;
}
export type Loan = GenericLoan<ScaledNumber>;
export type PlainLoan = GenericLoan<PlainScaledNumber>;
export type PlainLoans = Record<Address, PlainLoan[]>;

export const toPlainPosition = (position: Position): PlainPosition => {
  return {
    ...position,
    threshold: position.threshold.toPlain(),
    singleTopUp: position.singleTopUp.toPlain(),
    maxTopUp: position.maxTopUp.toPlain(),
    maxGasPrice: position.maxGasPrice.toPlain(),
    priorityFee: position.priorityFee.toPlain(),
  };
};

export const fromPlainPosition = (position: PlainPosition): Position => {
  return {
    ...position,
    threshold: ScaledNumber.fromPlain(position.threshold),
    singleTopUp: ScaledNumber.fromPlain(position.singleTopUp),
    maxTopUp: ScaledNumber.fromPlain(position.maxTopUp),
    maxGasPrice: ScaledNumber.fromPlain(position.maxGasPrice),
    priorityFee: ScaledNumber.fromPlain(position.priorityFee),
  };
};

interface GenericActionFees<T> {
  total: T;
  keeperFraction: T;
  treasuryFraction: T;
  lpFraction: T;
}

export type ActionFees = GenericActionFees<ScaledNumber>;
export type PlainActionFees = GenericActionFees<PlainScaledNumber>;

export const toPlainActionFees = (actionFees: ActionFees): PlainActionFees => {
  return {
    total: actionFees.total.toPlain(),
    keeperFraction: actionFees.keeperFraction.toPlain(),
    treasuryFraction: actionFees.treasuryFraction.toPlain(),
    lpFraction: actionFees.lpFraction.toPlain(),
  };
};

export const fromPlainActionFees = (actionFees: PlainActionFees): ActionFees => {
  return {
    total: ScaledNumber.fromPlain(actionFees.total),
    keeperFraction: ScaledNumber.fromPlain(actionFees.keeperFraction),
    treasuryFraction: ScaledNumber.fromPlain(actionFees.treasuryFraction),
    lpFraction: ScaledNumber.fromPlain(actionFees.lpFraction),
  };
};

export function positionFromPartial<T>(pool: Pool, position: Partial<Position>): Position {
  if (!position.protocol) throw Error("Missing protocol when creating position");
  if (!position.account) throw Error("Missing account when creating position");
  if (!position.threshold) throw Error("Missing threshold when creating position");
  if (!position.singleTopUp) throw Error("Missing single top-up when creating position");
  if (!position.maxTopUp) throw Error("Missing max top-up when creating position");
  if (!position.maxGasPrice) throw Error("Missing max top-up when creating position");
  if (!position.priorityFee) throw Error("Missing priority fee when creating position");
  return {
    protocol: position.protocol,
    account: position.account,
    threshold: position.threshold,
    singleTopUp: position.singleTopUp,
    priorityFee: position.priorityFee,
    maxTopUp: position.maxTopUp,
    maxGasPrice: position.maxGasPrice,
    actionToken: pool.underlying.address,
    depositToken: pool.lpToken.address,
  };
}

export function transformPool<T, U>(pool: GenericPool<T>, f: (v: T) => U): GenericPool<U> {
  return {
    ...pool,
    apy: pool.apy ? f(pool.apy) : null,
    totalAssets: f(pool.totalAssets),
    exchangeRate: f(pool.exchangeRate),
    maxWithdrawalFee: f(pool.maxWithdrawalFee),
    minWithdrawalFee: f(pool.minWithdrawalFee),
    feeDecreasePeriod: f(pool.feeDecreasePeriod),
    depositCap: f(pool.depositCap),
  };
}

export type Address = string;

export type Balances = Record<string, Optional<ScaledNumber>>;
export type PlainBalances = Record<string, Optional<PlainScaledNumber>>;

export const toPlainBalances = (balances: Balances): PlainBalances => {
  return fromEntries(
    Object.entries(balances).map(([key, value]) => [key, value?.toPlain() || null])
  );
};

export const fromPlainBalances = (balances: PlainBalances): Balances => {
  return fromEntries(
    Object.entries(balances).map(([key, value]) => [
      key,
      value ? ScaledNumber.fromPlain(value) : null,
    ])
  );
};

export type WithdrawalFees = Record<string, ScaledNumber>;
export type PlainWithdrawalFees = Record<string, PlainScaledNumber>;

export const toPlainWithdrawalFees = (withdrawalFees: WithdrawalFees): PlainWithdrawalFees => {
  return fromEntries(Object.entries(withdrawalFees).map(([key, value]) => [key, value.toPlain()]));
};

export const fromPlainWithdrawalFees = (withdrawalFees: PlainWithdrawalFees): WithdrawalFees => {
  return fromEntries(
    Object.entries(withdrawalFees).map(([key, value]) => [key, ScaledNumber.fromPlain(value)])
  );
};

export type Allowances = Record<string, Balances>;
export type PlainAllowances = Record<string, PlainBalances>;

export const toPlainAllowances = (allowances: Allowances): PlainAllowances => {
  return fromEntries(
    Object.entries(allowances).map(([key, value]) => [key, toPlainBalances(value)])
  );
};

export const fromPlainAllowances = (allowances: PlainAllowances): Allowances => {
  return fromEntries(
    Object.entries(allowances).map(([key, value]) => [key, fromPlainBalances(value)])
  );
};

export type Prices<Num = number> = Record<string, Optional<Num>>;
export type AllowanceQuery = {
  spender: Address;
  token: Pick<Token, "address" | "decimals">;
  onBehalfOf?: string;
};

export type TransactionDescription = {
  action: string;
  args?: Record<string, any>;
};

export type TransactionInfo = {
  hash: string;
  chainId: number;
  confirmations: number;
  timestamp: number;
  blockNumber?: number;
  status?: number;
  description: TransactionDescription;
};

export type TransactionConfirmation = Omit<TransactionInfo, "description" | "chainId">;

export function parseTransactionReceipt(receipt: TransactionReceipt): TransactionConfirmation {
  return {
    hash: receipt.transactionHash,
    blockNumber: receipt.blockNumber,
    timestamp: new Date().getTime(),
    confirmations: receipt.confirmations,
    status: receipt.status,
  };
}
