export type Optional<T> = T | null;

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Pool<Num = number> {
  address: string;
  lpToken: Token;
  underlying: Token;
  apy: Num;
  totalAssets: Num;
}

export interface Position<Num = number> {
  key: string; // key should be a hash of (protocol, threshold, account)
  protocol: string;
  account: Address;
  threshold: Num;
  singleTopUp: Num;
  totalTopUp: Num;
}

type Show = { toString: () => string };

export function transformPool<T extends Show, U>(
  pool: Pool<T>,
  f: (v: T) => U
): Pool<U> {
  return {
    address: pool.address,
    lpToken: pool.lpToken,
    underlying: pool.underlying,
    apy: f(pool.apy),
    totalAssets: f(pool.totalAssets),
  };
}

export function transformPosition<T extends Show, U>(
  position: Position<T>,
  f: (v: T) => U
): Position<U> {
  return {
    key: position.key,
    protocol: position.protocol,
    account: position.account,
    threshold: f(position.threshold),
    singleTopUp: f(position.singleTopUp),
    totalTopUp: f(position.totalTopUp),
  };
}

export type Address = string;

export type UserBalances<Num = number> = Record<string, Num>;
export type Prices<Num = number> = Record<string, Num>;
