import { TransactionReceipt } from "@ethersproject/providers";
import { PlainTokenValue, TokenValue } from "./token-value";

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

export interface Position<Num = number> {
  protocol: string;
  account: Address;
  threshold: Num;
  singleTopUp: TokenValue;
  maxTopUp: TokenValue;
  maxGasPrice: number;
  actionToken: Address;
  depositToken: Address;
}

export interface PlainPosition<Num = number> {
  protocol: string;
  account: Address;
  threshold: Num;
  singleTopUp: PlainTokenValue;
  maxTopUp: PlainTokenValue;
  maxGasPrice: number;
  actionToken: Address;
  depositToken: Address;
}

export const toPlainPosition = (position: Position): PlainPosition => {
  return {
    ...position,
    singleTopUp: position.singleTopUp.toPlain(),
    maxTopUp: position.maxTopUp.toPlain(),
  };
};

export const fromPlainPosition = (position: PlainPosition): Position => {
  return {
    ...position,
    singleTopUp: TokenValue.fromPlain(position.singleTopUp),
    maxTopUp: TokenValue.fromPlain(position.maxTopUp),
  };
};

export function positionFromPartial<T>(pool: Pool<T>, position: Partial<Position<T>>): Position<T> {
  return {
    protocol: position.protocol!!,
    account: position.account!!,
    threshold: position.threshold!!,
    singleTopUp: position.singleTopUp!!,
    maxTopUp: position.maxTopUp!!,
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

export type Balances = Record<string, TokenValue>;
export type PlainBalances = Record<string, PlainTokenValue>;

export const toPlainBalances = (balances: Balances): PlainBalances => {
  return Object.fromEntries(Object.entries(balances).map(([key, value]) => [key, value.toPlain()]));
};

export const fromPlainBalances = (balances: PlainBalances): Balances => {
  return Object.fromEntries(
    Object.entries(balances).map(([key, value]) => [key, TokenValue.fromPlain(value)])
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
