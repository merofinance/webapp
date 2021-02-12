import { Pool } from "../lib";
import dogeCoin from "./tokens/dogecoin.png";
import eth from "./tokens/eth-logo.svg.png";
import dai from "./tokens/multi-collateral-dai-dai-logo.png";
import usdc from "./tokens/usd-coin-usdc-logo.png";

export const tokenImages: Record<string, string> = {
  USDC: usdc,
  DAI: dai,
  ETH: eth,
};

export function getImage(pool: Pool): string {
  return pool.asset in tokenImages ? tokenImages[pool.asset] : dogeCoin;
}
