import { providers, Signer } from "ethers";
import { Address, Pool, Position, Prices, UserBalances } from "./types";

export interface Backd {
  currentAccount(): Promise<Address>;
  listPools(): Promise<Pool[]>;
  getPositions(pool: Address): Promise<Position[]>;
  getBalance(pool: Address, account?: Address): Promise<number>;
  getBalances(pools: Address[], account?: Address): Promise<UserBalances>;
  getPrices(symbol: string[]): Promise<Prices>;
}

export class Web3Backd implements Backd {
  constructor(private provider: Signer | providers.Provider) {}

  currentAccount(): Promise<string> {
    const signer = this.provider;
    if (signer instanceof Signer) {
      return signer.getAddress();
    }
    return Promise.resolve("");
  }

  async listPools(): Promise<Pool<number>[]> {
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
