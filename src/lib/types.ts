import { TransactionReceipt } from "@ethersproject/providers";
import fromEntries from "fromentries";
import { providers, Signer } from "ethers";

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

interface GenericPosition<T> {
  protocol: string;
  account: Address;
  threshold: T;
  singleTopUp: T;
  maxTopUp: T;
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
  };
};

export const fromPlainPosition = (position: PlainPosition): Position => {
  return {
    ...position,
    threshold: ScaledNumber.fromPlain(position.threshold),
    singleTopUp: ScaledNumber.fromPlain(position.singleTopUp),
    maxTopUp: ScaledNumber.fromPlain(position.maxTopUp),
    maxGasPrice: ScaledNumber.fromPlain(position.maxGasPrice),
  };
};

export function positionFromPartial<T>(pool: Pool<T>, position: Partial<Position>): Position {
  if (!position.protocol) throw Error("Missing protocol when creating position");
  if (!position.account) throw Error("Missing account when creating position");
  if (!position.threshold) throw Error("Missing threshold when creating position");
  if (!position.singleTopUp) throw Error("Missing single top-up when creating position");
  if (!position.maxTopUp) throw Error("Missing max top-up when creating position");
  if (!position.maxGasPrice) throw Error("Missing max top-up when creating position");
  return {
    protocol: position.protocol,
    account: position.account,
    threshold: position.threshold,
    singleTopUp: position.singleTopUp,
    maxTopUp: position.maxTopUp,
    maxGasPrice: position.maxGasPrice,
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

export type Balances = Record<string, Optional<ScaledNumber>>;
export type PlainBalances = Record<string, Optional<PlainScaledNumber>>;

export const toPlainBalances = (balances: Balances): PlainBalances => {
  return fromEntries(
    Object.entries(balances).map(([key, value]) => [key, value ? value.toPlain() : null])
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
