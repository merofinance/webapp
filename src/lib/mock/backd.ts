import { BigNumber, ContractTransaction, providers } from "ethers";
import { Pool } from "..";
import { Backd } from "../backd";
import { bigNumberToFloat } from "../numeric";
import {
  Address,
  AllowanceQuery,
  Balances,
  Position,
  Prices,
  Token,
  transformPool,
  transformPosition,
} from "../types";
import { balances, makeContractTransaction, masterAccount, pools, positions, prices } from "./data";

export default class MockBackd implements Backd {
  private allowances: Record<string, Balances> = {};

  get provider(): providers.Provider {
    return providers.getDefaultProvider();
  }

  currentAccount(): Promise<Address> {
    return Promise.resolve(masterAccount);
  }

  listPools(): Promise<Pool[]> {
    return Promise.resolve(pools.map((pool) => transformPool(pool, (v) => bigNumberToFloat(v))));
  }

  getPoolInfo(address: Address): Promise<Pool> {
    const pool = pools.find((pool) => pool.address === address)!!;
    return Promise.resolve(transformPool(pool, bigNumberToFloat));
  }

  getAllowance(token: Token, spender: Address, account?: string): Promise<number> {
    return Promise.resolve(this.allowances[token.address][spender] || 0);
  }

  getAllowances(queries: AllowanceQuery[]): Promise<Record<string, Balances>> {
    return Promise.resolve(this.allowances);
  }

  getBalance(pool: Address, account?: Address): Promise<number> {
    const number = pool in balances ? balances[pool] : BigNumber.from(0);
    return Promise.resolve(bigNumberToFloat(number));
  }

  async deposit(poolAddress: Address, amount: number): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(poolAddress, account);
  }

  async withdraw(poolAddress: Address, amount: number): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(poolAddress, account);
  }

  async approve(token: Token, spender: Address, amount: number): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    if (!this.allowances[token.address]) {
      this.allowances[token.address] = {};
    }
    this.allowances[token.address][spender] = amount;
    return makeContractTransaction(token.address, account);
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

  getPositions(): Promise<Position[]> {
    return Promise.resolve(positions.map((p) => transformPosition(p, bigNumberToFloat)));
  }

  get topupActionAddress(): string {
    return "0x38d6f612D116dBc1411E977A5D77E02bBae58e63";
  }

  listSupportedProtocols(): Promise<string[]> {
    return Promise.resolve(["Aave", "Compound"]);
  }

  async registerPosition(
    pool: Pool<number>,
    position: Position<number>
  ): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(this.topupActionAddress, account);
  }

  async removePosition(account: Address, protocol: string): Promise<ContractTransaction> {
    return makeContractTransaction(this.topupActionAddress, account);
  }
}
