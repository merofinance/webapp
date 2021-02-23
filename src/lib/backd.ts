import { Address, Pool, Position, Prices, UserBalances } from "./types";

export interface Backd {
  currentAccount(): Promise<Address>;
  listPools(): Promise<Pool[]>;
  getPositions(pool: Address): Promise<Position[]>;
  getBalance(pool: Address, account?: Address): Promise<number>;
  getBalances(pools: Address[], account?: Address): Promise<UserBalances>;
  getPrices(symbol: string[]): Promise<Prices>;
}
