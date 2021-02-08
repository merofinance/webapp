import { BigNumber } from "ethers";

export interface Pool {
  address: string;
  asset: string;
  name: string;
  apy: BigNumber;
  totalAssets: BigNumber;
}

export type Address = string;
