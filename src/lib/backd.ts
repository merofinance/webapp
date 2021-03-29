import contracts from "@backdfund/protocol/build/deployments/map.json";
import { Controller } from "@backdfund/protocol/typechain/Controller";
import { ControllerFactory } from "@backdfund/protocol/typechain/ControllerFactory";
import { Eip20InterfaceFactory } from "@backdfund/protocol/typechain/Eip20InterfaceFactory";
import { LiquidityPoolFactory } from "@backdfund/protocol/typechain/LiquidityPoolFactory";
import { providers, Signer } from "ethers";
import { bigNumberToFloat, scale } from "./numeric";
import {
  Address,
  Pool,
  Position,
  Prices,
  Token,
  transformPool,
  UserBalances,
} from "./types";

export type BackdOptions = {
  chainId: number;
};

export interface Backd {
  currentAccount(): Promise<Address>;
  listPools(): Promise<Pool[]>;
  getPositions(pool: Address): Promise<Position[]>;
  getBalance(pool: Address, account?: Address): Promise<number>;
  getBalances(pools: Address[], account?: Address): Promise<UserBalances>;
  getPrices(symbol: string[]): Promise<Prices>;
}

export class Web3Backd implements Backd {
  private controller: Controller;

  constructor(
    private provider: Signer | providers.Provider,
    private options: BackdOptions
  ) {
    const contracts = this.getContracts(options.chainId);

    this.controller = ControllerFactory.connect(
      contracts["Controller"][0],
      provider
    );
  }

  private getContracts(chainId: number): Record<string, string[]> {
    switch (chainId) {
      case 1337:
        return contracts["1337"];
      default:
        throw new Error(
          "Wrong network selected, please use a development network"
        );
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
      lpTokenAddress,
      underlyingAddress,
      totalAssets,
      rawApy,
    ] = await Promise.all([
      pool.getLpToken(),
      pool.getUnderlying(),
      pool.totalUnderlying(),
      pool.computeAPY(),
    ]);
    const [lpToken, underlying] = await Promise.all([
      this.getTokenInfo(lpTokenAddress),
      this.getTokenInfo(underlyingAddress),
    ]);
    const apy = rawApy.sub(scale(1));

    const rawPool = { underlying, lpToken, apy, address, totalAssets };
    return transformPool(rawPool, bigNumberToFloat);
  }

  async getPositions(pool: string): Promise<Position[]> {
    return [];
  }

  async getBalance(pool: string, account?: string): Promise<number> {
    return 0;
  }

  async getBalances(pools: string[], account?: string): Promise<UserBalances> {
    return {};
  }

  async getPrices(symbol: string[]): Promise<Prices> {
    return {};
  }
}
