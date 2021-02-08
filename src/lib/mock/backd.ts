import { BigNumber } from "ethers";
import { Pool } from "..";
import { Backd } from "../backd";
import { Address } from "../types";
import { balances, pools, prices } from "./data";

export default class MockBackd implements Backd {
  listPools(): Promise<Pool[]> {
    return Promise.resolve(pools);
  }

  getBalance(pool: Address, account: Address): Promise<BigNumber> {
    if (pool in balances) {
      return Promise.resolve(balances[pool]);
    }
    return Promise.resolve(BigNumber.from(0));
  }

  getPrices(symbols: string[]): Promise<Record<string, BigNumber>> {
    return Promise.resolve(
      Object.fromEntries(
        symbols.map((symbol) => [symbol, prices[symbol] || BigNumber.from(0)])
      )
    );
  }
}
