import { TransactionReceipt } from "@ethersproject/providers";
import { SerializedTokenValue, TokenValue } from "./token-value";

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

export interface SerialisedPosition<Num = number> {
  protocol: string;
  account: Address;
  threshold: Num;
  singleTopUp: SerializedTokenValue;
  maxTopUp: SerializedTokenValue;
  maxGasPrice: number;
  actionToken: Address;
  depositToken: Address;
}

export const serializePosition = (position: Position): SerialisedPosition => {
  return {
    ...position,
    singleTopUp: position.singleTopUp.serialized,
    maxTopUp: position.maxTopUp.serialized,
  };
};

export const deserializePosition = (position: SerialisedPosition): Position => {
  return {
    ...position,
    singleTopUp: new TokenValue(position.singleTopUp),
    maxTopUp: new TokenValue(position.maxTopUp),
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
export type SerializedBalances = Record<string, SerializedTokenValue>;

export const serializeBalances = (balances: Balances): SerializedBalances => {
  return Object.fromEntries(
    Object.entries(balances).map(([key, value]) => [key, value.serialized])
  );
};

export const deserializeBalances = (balances: SerializedBalances): Balances => {
  return Object.fromEntries(
    Object.entries(balances).map(([key, value]) => [key, new TokenValue(value)])
  );
};

export type Allowances = Record<string, Balances>;
export type SerializedAllowances = Record<string, SerializedBalances>;

export const serializeAllowances = (allowances: Allowances): SerializedAllowances => {
  return Object.fromEntries(
    Object.entries(allowances).map(([key, value]) => [key, serializeBalances(value)])
  );
};

export const deserializeAllowances = (allowances: SerializedAllowances): Allowances => {
  return Object.fromEntries(
    Object.entries(allowances).map(([key, value]) => [key, deserializeBalances(value)])
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
