import { Prices } from "./types";

const apiBaseURL = "https://api.coingecko.com/api/v3";

export type ApiPrices = Record<string, Record<string, number>>;

interface CoinInfo {
  id: string;
  symbol: string;
  name: string;
}

const getCoinId = (coinList: CoinInfo[], symbol: string): string => {
  const coin = coinList.find((c) => c.symbol === symbol.toLowerCase());
  if (!coin) throw new Error(`Coin ${symbol} not found`);
  return coin.id;
};

const getCoinSymbol = (coinList: CoinInfo[], id: string): string => {
  const coin = coinList.find((c) => c.id === id);
  if (!coin) throw new Error(`Coin ${id} not found`);
  return coin.symbol.toUpperCase();
};

const getCoinList = async (): Promise<CoinInfo[]> => {
  const url = `${apiBaseURL}/coins/list`;
  const response = await fetch(url);
  return response.json();
};

const fetchPrices = async (
  symbols: string[],
  quote: string,
  coinList: CoinInfo[]
): Promise<Prices> => {
  const coinIds = symbols.map((s) => getCoinId(coinList, s));
  const url = `${apiBaseURL}/simple/price?ids=${coinIds.join(",")}&vs_currencies=${quote}`;
  const response = await fetch(url);
  const apiPrices: ApiPrices = await response.json();
  const prices: Prices = {};
  coinIds.forEach((id) => {
    prices[getCoinSymbol(coinList, id)] = apiPrices[id][quote];
  });
  return prices;
};

export const getPrices = async (symbols: string[], quote = "USD"): Promise<Prices> => {
  const coinList = await getCoinList();
  return fetchPrices(symbols, quote.toLowerCase(), coinList);
};
