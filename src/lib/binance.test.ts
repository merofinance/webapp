import { getPrices } from "./binance";

test("fetches prices from Binance", async () => {
  const prices = await getPrices(["DAI", "USDC", "ETH"]);
  expect(prices.DAI).toBeCloseTo(1, 0.01);
  expect(prices.USDC).toBeCloseTo(1, 0.01);
  expect(prices.ETH).toBeGreaterThan(0);
});
