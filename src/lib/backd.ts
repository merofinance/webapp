import { Address, Pool, Prices, UserBalances } from "./types";

export interface Backd {
  currentAccount(): Promise<Address>;
  listPools(): Promise<Pool<number>[]>;
  getBalance(pool: Address, account?: Address): Promise<number>;
  getBalances(
    pools: Address[],
    account?: Address
  ): Promise<UserBalances<number>>;
  getPrices(symbol: string[]): Promise<Prices<number>>;
}
