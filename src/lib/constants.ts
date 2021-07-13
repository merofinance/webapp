import { BigNumber } from "ethers";

export const ETH_DUMMY_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ETH_DECIMALS = 18;
export const DEFAULT_DECIMALS = ETH_DECIMALS;
export const DEFAULT_SCALE = BigNumber.from(10).pow(DEFAULT_DECIMALS);
export const LIVE: boolean = false;
export const PLACEHOLDER_TOOLTIP =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris";
export const INFURA_ID = "f42c3f37e40b4ab1bc5a0d7bf5612d0f";
export const ETHERSCAN_URL = "https://etherscan.io/address/";
