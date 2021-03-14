import { providers, Signer } from "ethers";
import {
  Address,
  Pool,
  Position,
  Prices,
  transformPool,
  UserBalances,
} from "./types";

import contracts from "@backdfund/protocol/build/deployments/map.json";
import { Controller } from "@backdfund/protocol/typechain/Controller";
import { ControllerFactory } from "@backdfund/protocol/typechain/ControllerFactory";
import { BTokenFactory } from "@backdfund/protocol/typechain/BTokenFactory";
import { Eip20InterfaceFactory } from "@backdfund/protocol/typechain/Eip20InterfaceFactory";
import { bigNumberToFloat, scale } from "./numeric";

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

  private async getPoolInfo(address: Address): Promise<Pool> {
    const btoken = BTokenFactory.connect(address, this.provider);

    const [name, underlying, totalAssets] = await Promise.all([
      btoken.name(),
      btoken.getUnderlying(),
      btoken.totalUnderlyingLocked(),
    ]);
    const asset = await Eip20InterfaceFactory.connect(
      underlying,
      this.provider
    ).symbol();

    // TODO: compute APY
    const apy = scale(237, 17);

    const pool = { asset, name, apy, address, totalAssets };
    return transformPool(pool, bigNumberToFloat);
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
