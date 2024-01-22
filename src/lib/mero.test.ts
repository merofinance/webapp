import { ethers } from "ethers";
import { DUMMY_ETH_ADDRESS } from "./constants";
import { createMero } from "./factory";
import { Web3Mero } from "./mero";

const infuraId = process.env.WEB3_INFURA_PROJECT_ID;
if (!infuraId) throw new Error("WEB3_INFURA_PROJECT_ID not given");
const rpc = `https://mainnet.infura.io/v3/${infuraId}`;
const provider = new ethers.providers.JsonRpcProvider(rpc);
const mero = createMero(provider, { chainId: 1 }) as Web3Mero;

const eth = {
  address: DUMMY_ETH_ADDRESS,
  decimals: 18,
  name: "Ethereum",
  symbol: "ETH",
};

const usdc = {
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  decimals: 6,
  name: "USD Coin",
  symbol: "USDC",
};

test("getPricesFromOracle", async () => {
  const prices = await mero.getPricesFromOracle([usdc, eth]);
  expect(prices[eth.symbol]).toBeGreaterThanOrEqual(800);
  expect(prices[eth.symbol]).toBeLessThanOrEqual(5000);
  expect(prices[usdc.symbol]).toBeGreaterThanOrEqual(0.99);
  expect(prices[usdc.symbol]).toBeLessThanOrEqual(1.01);
});
