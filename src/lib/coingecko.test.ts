import { ApiPrices, convertPrices } from "./coingecko";

const samplePrices: ApiPrices = {
  ethereum: {
    usd: 1845.02,
  },
  "aave-dai": {
    usd: 0.997199,
  },
};

const geckoIdToSymbol: Record<string, string> = {
  "aave-dai": "adai",
  ethereum: "eth",
};

test("convertPrices restores symbols", () => {
  const prices = convertPrices(["ETH", "aDAI"], "usd", geckoIdToSymbol, samplePrices);
  expect(prices).toEqual({
    ETH: samplePrices["ethereum"]["usd"],
    aDAI: samplePrices["aave-dai"]["usd"],
  });
});
