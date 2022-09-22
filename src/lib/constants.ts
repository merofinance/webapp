import { BigNumber } from "ethers";

// Feature toggles
export const STAKING_LIVE = false;
export const ACTIONS_LIVE = false;

// Variables
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const DUMMY_ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ETH_DECIMALS = 18;
export const GWEI_DECIMALS = 9;
export const INFINITE_APPROVE_AMMOUNT = 10 ** 10;
export const DEFAULT_DECIMALS = ETH_DECIMALS;
export const DEFAULT_SCALE = BigNumber.from(10).pow(DEFAULT_DECIMALS);
export const GWEI_SCALE = BigNumber.from(10).pow(BigNumber.from(GWEI_DECIMALS));
export const INFURA_ID = "f42c3f37e40b4ab1bc5a0d7bf5612d0f";
export const RECOMMENDED_THRESHOLD = 1.2;
export const MILLISECONDS_PER_YEAR = 365 * 24 * 60 * 60 * 1000;
export const DATE_FORMAT = "mmm-d-yyyy";
export const TOPUP_ACTION_ROUTE = "/actions/register/topup";
export const SLIPPAGE_TOLERANCE = 0.98; // 2%
export const GAS_BUFFER = 11; // This is 10%, we use it as BigNumber.mul(GAS_BUFFER).div(10)

export const chainIds: Record<string, string> = {
  "1": "Mainnet",
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
  "1337": "https://etherscan.io/", // NOTE: only here to have some dummy URL in dev
};

export const oldPools: Record<string, string[]> = {
  "1": [
    "0x2C681E62De119DdCC8bb7E78D7eB92D6C88BcAFe",
    "0xdAe9AE3064340C8519b663d17e70C3D6912C79Fd",
    "0xdA83E512e2D675B8De524a6d21c86254dC7d47B6",
  ],
  "42": [
    "0x5E7655a55927DE870B9625e0844c288DE944fc7E",
    "0x1Ef49351b5D2d7BF151F5cFE55e9CdA97aAd4CE4",
    "0xB18Ca6102A307207034E0F6b1a51386516E1b71d",
  ],
};

export const oldAddressProviders: Record<string, string> = {
  "1": "0x139c15e21b0f6e43Fc397faCe5De5b7D5ae6874a",
  "42": "0xFCf9099D09dBf9498Ad356006C95bDb988022e7E",
};
