import { BigNumber } from "ethers";

export const ETH_DUMMY_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ETH_DECIMALS = 18;
export const INFINITE_APPROVE_AMMOUNT = 10 ** 10;
export const DEFAULT_DECIMALS = ETH_DECIMALS;
export const DEFAULT_SCALE = BigNumber.from(10).pow(DEFAULT_DECIMALS);
export const STAKING_LIVE = false;
export const INFURA_ID = "f42c3f37e40b4ab1bc5a0d7bf5612d0f";

export const chainIds: Record<string, string> = {
  "1": "Mainet",
  "3": "Ropsten",
  "4": "Rinkeby",
  "5": "Goerli",
  "42": "Kovan",
};

export const etherscanUrls: Record<string, string> = {
  "1": "https://etherscan.io/",
  "3": "https://ropsten.etherscan.io/",
  "4": "https://rinkeby.etherscan.io/",
  "5": "https://goerli.etherscan.io/",
  "42": "https://kovan.etherscan.io/",
};
