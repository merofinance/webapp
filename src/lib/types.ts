import { TransactionReceipt } from "@ethersproject/providers";
import { PlainScaledNumber, ScaledNumber } from "./scaled-number";

export type Optional<T> = T | null;

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Pool<Num = number> {
  name: string;
  address: string;
  stakerVaultAddress: string;
  lpToken: Token;
  underlying: Token;
  apy: Num;
  totalAssets: Num;
  exchangeRate: Num;
}

export interface Position {
  protocol: string;
  account: Address;
  threshold: ScaledNumber;
  singleTopUp: ScaledNumber;
  maxTopUp: ScaledNumber;
  maxGasPrice: number;
  actionToken: Address;
  depositToken: Address;
}

export interface PlainPosition {
  protocol: string;
  account: Address;
  threshold: PlainScaledNumber;
  singleTopUp: PlainScaledNumber;
  maxTopUp: PlainScaledNumber;
  maxGasPrice: number;
  actionToken: Address;
  depositToken: Address;
}

export const toPlainPosition = (position: Position): PlainPosition => {
  return {
    ...position,
    threshold: position.threshold.toPlain(),
    singleTopUp: position.singleTopUp.toPlain(),
    maxTopUp: position.maxTopUp.toPlain(),
  };
};

export const fromPlainPosition = (position: PlainPosition): Position => {
  return {
    ...position,
    threshold: ScaledNumber.fromPlain(position.threshold),
    singleTopUp: ScaledNumber.fromPlain(position.singleTopUp),
    maxTopUp: ScaledNumber.fromPlain(position.maxTopUp),
  };
};

export function positionFromPartial<T>(pool: Pool<T>, position: Partial<Position>): Position {
  if (!position.protocol) throw Error("Missing protocol when creating position");
  if (!position.account) throw Error("Missing account when creating position");
  if (!position.threshold) throw Error("Missing threshold when creating position");
  if (!position.singleTopUp) throw Error("Missing single top up when creating position");
  if (!position.maxTopUp) throw Error("Missing max top up when creating position");
  return {
    protocol: position.protocol,
    account: position.account,
    threshold: position.threshold,
    singleTopUp: position.singleTopUp,
    maxTopUp: position.maxTopUp,
    maxGasPrice: 0,
    actionToken: pool.underlying.address,
    depositToken: pool.lpToken.address,
  };
}

export function transformPool<T, U>(pool: Pool<T>, f: (v: T) => U): Pool<U> {
  return {
    ...pool,
    apy: f(pool.apy),
    totalAssets: f(pool.totalAssets),
    exchangeRate: f(pool.exchangeRate),
  };
}

export type Address = string;

export type Balances = Record<string, ScaledNumber>;
export type PlainBalances = Record<string, PlainScaledNumber>;

export const toPlainBalances = (balances: Balances): PlainBalances => {
  return Object.fromEntries(Object.entries(balances).map(([key, value]) => [key, value.toPlain()]));
};

export const fromPlainBalances = (balances: PlainBalances): Balances => {
  return Object.fromEntries(
    Object.entries(balances).map(([key, value]) => [key, ScaledNumber.fromPlain(value)])
  );
};

export type Allowances = Record<string, Balances>;
export type PlainAllowances = Record<string, PlainBalances>;

export const toPlainAllowances = (allowances: Allowances): PlainAllowances => {
  return Object.fromEntries(
    Object.entries(allowances).map(([key, value]) => [key, toPlainBalances(value)])
  );
};

export const fromPlainAllowances = (allowances: PlainAllowances): Allowances => {
  return Object.fromEntries(
    Object.entries(allowances).map(([key, value]) => [key, fromPlainBalances(value)])
  );
};

export type Prices<Num = number> = Record<string, Num>;
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
