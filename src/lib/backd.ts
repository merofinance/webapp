import { BigNumber } from "ethers";
import { Address, Pool } from "./types";

export interface Backd {
  listPools(): Promise<Pool[]>;
  getBalance(pool: Address, account: Address): Promise<BigNumber>;
  getPrices(symbol: string[]): Promise<Record<string, BigNumber>>;
}
