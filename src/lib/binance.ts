import fromEntries from "fromentries";
import { Prices } from "./types";

const apiBaseURL = "https://api.binance.com/api/v3";

type PriceResponse = { symbol: string; price: string };

async function fetchPrice(symbol: string, quote: string): Promise<PriceResponse> {
  const url = `${apiBaseURL}/ticker/price?symbol=${symbol}${quote}`;
  return (await fetch(url)).json();
}

export async function getPrices(symbols: string[], quote = "BUSD"): Promise<Prices> {
  const requests = symbols.map((s) => fetchPrice(s, quote));
  const responses = await Promise.all(requests);
  return fromEntries(responses.map((res, i) => [symbols[i], Number(res.price)]));
}
