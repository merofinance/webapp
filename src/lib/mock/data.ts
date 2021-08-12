import { BigNumber, ContractReceipt, ContractTransaction } from "ethers";
import { scale } from "../numeric";
import { TokenValue } from "../scaled-number";
import { Address, Pool, PlainPosition } from "../types";

export const masterAccount = "0xbacE8e7f276FD2Ee5ecE5C1df18BF381148862A6";

// numbers are scaled to 10^18 to emulate contracst return values
export const pools: Pool<BigNumber>[] = [
  {
    name: "bDAI3CRV",
    apy: scale(237, 17),
    totalAssets: scale(84180923),
    address: "0xC265707cb6Fa41b51F899000bF248A257eFB52aB",
    stakerVaultAddress: "0x1F7EEe24524fbA780E018EDBfda0Ad4881321118",
    exchangeRate: scale(1003, 15),
    underlying: {
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      name: "Dai Stablecoin",
      symbol: "DAI",
      decimals: 18,
    },
    lpToken: {
      address: "0x25FF22De379B644BD5C2263404baC6FeE5a4b8de",
      name: "Backd DAI",
      symbol: "bDAI",
      decimals: 18,
    },
  },
  {
    name: "bUSDC3CRV",
    apy: scale(193, 17),
    totalAssets: scale(91923401),
    address: "0xEA3b27fa12eBC0D562a9CCbe9611c866551d3792",
    stakerVaultAddress: "0x733A99bADccF588ff3832e6F253fC0512e589339",
    exchangeRate: scale(1010, 15),
    underlying: {
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
    },
    lpToken: {
      address: "0x99A77926B3FB49619DC3A1DAc18565bcB5A98b93",
      name: "Backd USDC",
      symbol: "bUSDC",
      decimals: 18,
    },
  },
  {
    name: "bETHCRV",
    apy: scale(218, 17),
    totalAssets: scale(19738),
    address: "0xCa0cF7A135AC852a4d5591dC48e93e5F67425cB9",
    stakerVaultAddress: "0x927d94DfF23dF29e1BD9C6cAc36C1F23ffafFCb6",
    exchangeRate: scale(1005, 15),
    underlying: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000",
    },
    lpToken: {
      name: "Backd ETH",
      symbol: "ETH",
      decimals: 18,
      address: "0xa09021117e4f31B83140Ae16b44F634c8624b625",
    },
  },
];

export const prices: Record<string, BigNumber> = {
  DAI: scale(1002, 15), // DAI/USD = 1.002
  USDC: scale(1, 18), // USDC/USD = 1.000
  ETH: scale(1650, 18), // ETH/USD = 1650
};

export const balances: Record<string, BigNumber> = {
  [pools[0].lpToken.address]: scale(250_000, 18), // 250,000 bDAI
  [pools[0].underlying.address]: scale(120_000, 18), // 120,000 DAI
  [pools[2].lpToken.address]: scale(48, 18), // 48 bETH
};

const positionKeys = [
  {
    protocol: "Compound",
    account: "0xE9998d2C082c340D9b7023FA27a54c14f0Bb3F9c",
    threshold: 105,
  },
  {
    protocol: "Aave",
    account: "0xb47b5D45CDBa7D1114A632c010E0bC9B2053B1c1",
    threshold: 110,
  },
];

export const positions: PlainPosition[] = [
  {
    singleTopUp: TokenValue.fromUnscaled(1500).toPlain(),
    maxTopUp: TokenValue.fromUnscaled(4500).toPlain(),
    maxGasPrice: 10 ** 10,
    actionToken: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    depositToken: "0x99A77926B3FB49619DC3A1DAc18565bcB5A98b93",
    ...positionKeys[0],
  },
  {
    singleTopUp: TokenValue.fromUnscaled(10_000).toPlain(),
    maxTopUp: TokenValue.fromUnscaled(50_000).toPlain(),
    maxGasPrice: 5 * 10 ** 10,
    actionToken: "0x6b175474e89094c44da98b954eedeac495271d0f",
    depositToken: "0x25FF22De379B644BD5C2263404baC6FeE5a4b8de",
    ...positionKeys[1],
  },
];

export const makeContractRecipt = (contractAddress: Address, account: Address): ContractReceipt => {
  return {
    to: contractAddress,
    from: account,
    contractAddress,
    transactionIndex: 18,
    gasUsed: BigNumber.from(186_434),
    logsBloom: "",
    blockHash: "0xa4df94e6bab404a13391c7b57a70650cb58136e5ebab050fa5eb39be923ce2dd",
    transactionHash: "0x7423f887de21accf3e72889e17532b051733073a4871e130e1a4cf3c01fa4a20",
    logs: [],
    blockNumber: 11678953,
    confirmations: 1,
    cumulativeGasUsed: BigNumber.from(186_434),
    byzantium: true,
    effectiveGasPrice: BigNumber.from(50),
    type: 2,
  };
};

export const makeContractTransaction = (
  contractAddress: Address,
  account: Address
): ContractTransaction => {
  return {
    hash: "0x7423f887de21accf3e72889e17532b051733073a4871e130e1a4cf3c01fa4a20",
    blockNumber: 11678953,
    timestamp: 1610968925,
    confirmations: 1,
    from: account,
    nonce: 1,
    gasLimit: BigNumber.from(296_053),
    gasPrice: scale(92, 9),
    data: "",
    value: BigNumber.from(0),
    chainId: 1,
    wait: () => Promise.resolve(makeContractRecipt(contractAddress, account)),
  };
};
