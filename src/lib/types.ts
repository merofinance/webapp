import { TransactionReceipt } from "@ethersproject/providers";

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
  singleTopUp: Num;
  maxTopUp: Num;
  maxGasPrice: number;
  actionToken: Address;
  depositToken: Address;
}

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

export function transformPosition<T, U>(position: Position<T>, f: (v: T) => U): Position<U> {
  return {
    protocol: position.protocol,
    account: position.account,
    actionToken: position.actionToken,
    depositToken: position.depositToken,
    maxGasPrice: position.maxGasPrice,
    threshold: f(position.threshold),
    singleTopUp: f(position.singleTopUp),
    maxTopUp: f(position.maxTopUp),
  };
}

export type Address = string;

export type Balances<Num = number> = Record<string, Num>;
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
