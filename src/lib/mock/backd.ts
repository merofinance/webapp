import { BigNumber, ContractTransaction } from "ethers";
import { Pool } from "..";
import { Backd } from "../backd";
import { bigNumberToFloat } from "../numeric";
import {
  Address,
  AllowanceQuery,
  Balances,
  Position,
  Prices,
  transformPool,
  transformPosition,
} from "../types";
import {
  balances,
  makeDepositContractTransaction,
  masterAccount,
  pools,
  positions,
  prices,
} from "./data";

export default class MockBackd implements Backd {
  currentAccount(): Promise<Address> {
    return Promise.resolve(masterAccount);
  }

  listPools(): Promise<Pool[]> {
    return Promise.resolve(pools.map((pool) => transformPool(pool, (v) => bigNumberToFloat(v))));
  }

  getAllowance(tokenAddress: Address, spender: Address, account?: string): Promise<number> {
    return Promise.resolve(0);
  }

  getAllowances(queries: AllowanceQuery[]): Promise<Balances> {
    return Promise.resolve(Object.fromEntries(queries.map((q) => [q.token.symbol, 0])));
  }

  getBalance(pool: Address, account?: Address): Promise<number> {
    const number = pool in balances ? balances[pool] : BigNumber.from(0);
    return Promise.resolve(bigNumberToFloat(number));
  }

  async deposit(poolAddress: Address, amount: number): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeDepositContractTransaction(poolAddress, account);
  }

  async getBalances(pools: Address[], account?: Address): Promise<Balances> {
    const balances = await Promise.all(pools.map((p) => this.getBalance(p, account)));
    return Object.fromEntries(pools.map((p, i) => [p, balances[i]]));
  }

  getPrices(symbols: string[]): Promise<Prices> {
    return Promise.resolve(
      Object.fromEntries(
        symbols.map((symbol) => [symbol, bigNumberToFloat(prices[symbol] || BigNumber.from(0))])
      )
    );
  }

  getPositions(pool: string): Promise<Position[]> {
    const poolPositions = positions[pool] || [];
    return Promise.resolve(poolPositions.map((p) => transformPosition(p, bigNumberToFloat)));
  }
}
