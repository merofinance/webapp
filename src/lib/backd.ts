import contracts from "@backdfund/protocol/build/deployments/map.json";
import { Controller } from "@backdfund/protocol/typechain/Controller";
import { ControllerFactory } from "@backdfund/protocol/typechain/ControllerFactory";
import { Eip20InterfaceFactory } from "@backdfund/protocol/typechain/Eip20InterfaceFactory";
import { LiquidityPoolFactory } from "@backdfund/protocol/typechain/LiquidityPoolFactory";
import { ContractTransaction, providers, Signer } from "ethers";
import { getPrices } from "./coingecko";
import { bigNumberToFloat, floatToBigNumber, scale } from "./numeric";
import {
  Address,
  AllowanceQuery,
  Balances,
  Pool,
  Position,
  Prices,
  Token,
  transformPool,
} from "./types";

export type BackdOptions = {
  chainId: number;
};

export interface Backd {
  currentAccount(): Promise<Address>;
  listPools(): Promise<Pool[]>;
  getPositions(pool: Address): Promise<Position[]>;
  getBalance(address: Address, account?: Address): Promise<number>;
  getBalances(addresses: Address[], account?: Address): Promise<Balances>;
  getAllowance(tokenAddress: Address, spender: Address, account?: string): Promise<number>;
  getAllowances(queries: AllowanceQuery[]): Promise<Balances>;
  getPrices(symbol: string[]): Promise<Prices>;
  deposit(poolAddress: Address, amount: number): Promise<ContractTransaction>;
}

export class Web3Backd implements Backd {
  private controller: Controller;

  constructor(private provider: Signer | providers.Provider, private options: BackdOptions) {
    const contracts = this.getContracts(options.chainId);

    this.controller = ControllerFactory.connect(contracts["Controller"][0], provider);
  }

  private getContracts(chainId: number): Record<string, string[]> {
    switch (chainId) {
      case 1337:
        return contracts["1337"];
      default:
        throw new Error("Wrong network selected, please use a development network");
    }
  }

  currentAccount(): Promise<string> {
    const signer = this.provider;
    if (signer instanceof Signer) {
      return signer.getAddress();
    }
    return Promise.resolve("");
  }

  async listPools(): Promise<Pool[]> {
    const markets = await this.controller.allMarkets();
    return Promise.all(markets.map((v) => this.getPoolInfo(v)));
  }

  async getTokenInfo(tokenAddress: Address): Promise<Token> {
    const token = Eip20InterfaceFactory.connect(tokenAddress, this.provider);
    const [name, symbol, decimals] = await Promise.all([
      token.name(),
      token.symbol(),
      token.decimals(),
    ]);
    return { address: tokenAddress, name, symbol, decimals };
  }

  private async getPoolInfo(address: Address): Promise<Pool> {
    const pool = LiquidityPoolFactory.connect(address, this.provider);
    const [
      name,
      lpTokenAddress,
      underlyingAddress,
      totalAssets,
      rawApy,
      exchangeRate,
    ] = await Promise.all([
      pool.name(),
      pool.getLpToken(),
      pool.getUnderlying(),
      pool.totalUnderlying(),
      pool.computeAPY(),
      pool.currentExchangeRate(),
    ]);
    const [lpToken, underlying] = await Promise.all([
      this.getTokenInfo(lpTokenAddress),
      this.getTokenInfo(underlyingAddress),
    ]);
    const apy = rawApy.sub(scale(1));

    const rawPool = {
      name,
      underlying,
      lpToken,
      apy,
      address,
      totalAssets,
      exchangeRate,
    };
    return transformPool(rawPool, bigNumberToFloat);
  }

  async getPositions(pool: string): Promise<Position[]> {
    return [];
  }

  async getAllowance(tokenAddress: Address, spender: Address, account?: string): Promise<number> {
    const token = Eip20InterfaceFactory.connect(tokenAddress, this.provider);
    if (!account) {
      account = await this.currentAccount();
    }
    const rawAllowance = await token.allowance(account, spender);
    return bigNumberToFloat(rawAllowance);
  }

  async getAllowances(queries: AllowanceQuery[]): Promise<Balances> {
    const allowances = await Promise.all(
      queries.map((q) => this.getAllowance(q.token.address, q.spender, q.onBehalfOf))
    );
    return Object.fromEntries(queries.map((q, i) => [q.token.symbol, allowances[i]]));
  }

  async deposit(poolAddress: Address, amount: number): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(poolAddress, this.provider);
    const scaledAmount = floatToBigNumber(amount);
    return poolContract.deposit(scaledAmount);
  }

  async getBalance(address: string, account?: string): Promise<number> {
    const token = Eip20InterfaceFactory.connect(address, this.provider);
    if (!account) {
      account = await this.currentAccount();
    }
    const rawBalance = await token.balanceOf(account);
    return bigNumberToFloat(rawBalance);
  }

  async getBalances(addresses: string[], account?: string): Promise<Balances> {
    const promises = addresses.map((a) => this.getBalance(a, account));
    const balances = await Promise.all(promises);
    return Object.fromEntries(addresses.map((a, i) => [a, balances[i]]));
  }

  async getPrices(symbols: string[]): Promise<Prices> {
    return getPrices(symbols);
  }
}
