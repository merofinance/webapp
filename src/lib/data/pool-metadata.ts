import { ScaledNumber } from "scaled-number";

import eth from "../../assets/tokens/eth.png";
import usdc from "../../assets/tokens/usdc.png";
import dai from "../../assets/tokens/dai.png";
import usdt from "../../assets/tokens/usdt.png";
import frax from "../../assets/tokens/frax.png";

export interface PoolMetadata {
  icon: string;
  id: string;
  symbol: string;
}

const POOL_METADATA: PoolMetadata[] = [
  {
    id: "42cd9ead-de9e-4878-99a1-a984e2ffb4d9",
    symbol: "FRAX",
    icon: frax,
  },
  {
    id: "2e9d6ab7-4329-48fd-b962-2ae0e58fc162",
    symbol: "USDT",
    icon: usdt,
  },
  {
    id: "d9b38ffb-b796-454c-a115-7643fee20f5d",
    symbol: "ETH",
    icon: eth,
  },
  {
    id: "65f68bad-18ed-45a7-b089-813780516cdd",
    symbol: "DAI",
    icon: dai,
  },
  {
    id: "9078aa8f-7378-4969-925e-567e0c9b8da9",
    symbol: "USDC",
    icon: usdc,
  },
];

export default POOL_METADATA;

export const oldPoolApys: Record<string, ScaledNumber> = {
  "0x2C681E62De119DdCC8bb7E78D7eB92D6C88BcAFe": ScaledNumber.fromUnscaled(0.0966),
  "0xdAe9AE3064340C8519b663d17e70C3D6912C79Fd": ScaledNumber.fromUnscaled(-0.03090443061),
  "0xdA83E512e2D675B8De524a6d21c86254dC7d47B6": ScaledNumber.fromUnscaled(0.1008),
};
