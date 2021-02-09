export type Optional<T> = T | null;

export interface Pool<Num = number> {
  address: string;
  asset: string;
  name: string;
  apy: Num;
  totalAssets: Num;
}

type Show = { toString: () => string };

export function transformPool<T extends Show, U>(
  pool: Pool<T>,
  f: (v: T) => U
): Pool<U> {
  return {
    address: pool.address,
    asset: pool.asset,
    name: pool.name,
    apy: f(pool.apy),
    totalAssets: f(pool.totalAssets),
  };
}

export type Address = string;

export type UserBalances<Num = number> = Record<string, Num>;
export type Prices<Num = number> = Record<string, Num>;
