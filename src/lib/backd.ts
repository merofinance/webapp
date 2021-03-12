import { providers, Signer } from "ethers";
import { Address, Pool, Position, Prices, UserBalances } from "./types";

import contracts from "@backdfund/protocol/build/deployments/map.json";
import { Controller } from "@backdfund/protocol/typechain/Controller";
import { ControllerFactory } from "@backdfund/protocol/typechain/ControllerFactory";

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

  async listPools(): Promise<Pool<number>[]> {
    const markets = await this.controller.allMarkets();
    // TODO: retrieve pool info
    console.log(markets);
    return [];
  }

  async getPositions(pool: string): Promise<Position<number>[]> {
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
