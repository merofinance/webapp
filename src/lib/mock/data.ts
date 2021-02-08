import { BigNumber, BigNumberish } from "ethers";
import { Pool } from "../types";

export const masterAccount = "0xbacE8e7f276FD2Ee5ecE5C1df18BF381148862A6";

function scale(number: BigNumberish, decimals: number = 18) {
  return BigNumber.from(number).mul(BigNumber.from(10).pow(decimals));
}

// numbers are scaled to 10^18 to emulate contracst return values
export const pools: Pool[] = [
  {
    asset: "DAI",
    name: "bDAI3CRV",
    apy: scale(237, 17),
    totalAssets: scale(84180923),
    address: "0xC265707cb6Fa41b51F899000bF248A257eFB52aB",
  },
  {
    asset: "USDC",
    name: "bUSDC3CRV",
    apy: scale(193, 17),
    totalAssets: scale(121923401),
    address: "0xEA3b27fa12eBC0D562a9CCbe9611c866551d3792",
  },
  {
    asset: "ETH",
    name: "bETHCRV",
    apy: scale("193", 17),
    totalAssets: scale(19738),
    address: "0xCa0cF7A135AC852a4d5591dC48e93e5F67425cB9",
  },
];

export const prices: Record<string, BigNumber> = {
  DAI: scale(1002, 15), // DAI/USD = 1.002
  USDC: scale(1, 18), // USDC/USD = 1.000
  ETH: scale(1650, 18), // ETH/USD = 1650
};

export const balances: Record<string, BigNumber> = {
  [pools[0].address]: scale(250_000, 18), // 250,000 DAI
  [pools[2].address]: scale(48, 18), // 48 ETH
};
