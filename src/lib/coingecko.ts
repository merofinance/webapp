import { Prices } from "./types";

const apiBaseURL = "https://api.coingecko.com/api/v3";

type CoinsMapping = {
  geckoIdToSymbol: Record<string, string>;
  symbolToGeckoId: Record<string, string>;
  initialized: boolean;
};

export type ApiPrices = Record<string, Record<string, number>>;

type CoinInfo = { id: string; symbol: string; name: string };

const coinsMapping: CoinsMapping = {
  geckoIdToSymbol: {},
  symbolToGeckoId: {},
  initialized: false,
};

// NOTE: this is static and is safe to cache
export async function fetchCoinsMappings(): Promise<CoinsMapping> {
  if (coinsMapping.initialized) {
    return coinsMapping;
  }
  const url = apiBaseURL + "/coins/list";
  const response = await fetch(url);
  const coinsList: CoinInfo[] = await response.json();
  coinsList.forEach((coin) => {
    coinsMapping.geckoIdToSymbol[coin.id] = coin.symbol;
    coinsMapping.symbolToGeckoId[coin.symbol] = coin.id;
  });
  coinsMapping.initialized = true;
  return coinsMapping;
}

export function convertPrices(
  symbols: string[],
  quote: string,
  geckoIdToSymbol: Record<string, string>,
  apiPrices: ApiPrices
): Prices {
  const prices: Prices = {};

  for (const coinId in apiPrices) {
    const price = apiPrices[coinId][quote];
    const rawSymbol = geckoIdToSymbol[coinId];
    const symbol = symbols.find((s) => s.toLowerCase() === rawSymbol);
    if (!symbol) {
      console.error(`received price for unexpected symbol ${rawSymbol}`);
      continue;
    }
    prices[symbol] = price;
  }

  return prices;
}

export async function getPrices(symbols: string[], quote: string = "USD"): Promise<Prices> {
  quote = quote.toLowerCase();

  const { geckoIdToSymbol, symbolToGeckoId } = await fetchCoinsMappings();

  const ids = symbols.map((symbol) => symbolToGeckoId[symbol.toLowerCase()]).join(",");
  const url = `${apiBaseURL}/simple/price?ids=${ids}&vs_currencies=${quote}`;
  const response = await fetch(url);
  const apiPrices: Record<string, Record<string, number>> = await response.json();

  return convertPrices(symbols, quote, geckoIdToSymbol, apiPrices);
}
