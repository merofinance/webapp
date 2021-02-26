import { BigNumber, ethers } from "ethers";
import { scale } from "../numeric";
import { Address, Pool, Position } from "../types";

export const masterAccount = "0xbacE8e7f276FD2Ee5ecE5C1df18BF381148862A6";

// numbers are scaled to 10^18 to emulate contracst return values
export const pools: Pool<BigNumber>[] = [
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
    totalAssets: scale(91923401),
    address: "0xEA3b27fa12eBC0D562a9CCbe9611c866551d3792",
  },
  {
    asset: "ETH",
    name: "bETHCRV",
    apy: scale(218, 17),
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
  [pools[0].name]: scale(250_000, 18), // 250,000 DAI
  [pools[2].name]: scale(48, 18), // 48 ETH
};

const positionKeys = [
  {
    protocol: "Compound",
    account: "0xE9998d2C082c340D9b7023FA27a54c14f0Bb3F9c",
    threshold: scale(105, 16),
  },
  {
    protocol: "Aave",
    account: "0xb47b5D45CDBa7D1114A632c010E0bC9B2053B1c1",
    threshold: scale(110, 16),
  },
];

function generateKey(positionKey: typeof positionKeys[0]): string {
  return ethers.utils.soliditySha256(
    ["string", "string", "uint256"],
    [positionKey.protocol, positionKey.account, positionKey.threshold]
  );
}

export const positions: Record<Address, Position<BigNumber>[]> = {
  [pools[0].address]: [
    {
      key: generateKey(positionKeys[0]),
      singleTopUp: scale(1500),
      totalTopUp: scale(4500),
      ...positionKeys[0],
    },
  ],
  [pools[2].address]: [
    {
      key: generateKey(positionKeys[1]),
      singleTopUp: scale(10_000),
      totalTopUp: scale(50_000),
      ...positionKeys[1],
    },
  ],
};
