import { ScaledNumber } from "scaled-number";

import eth from "../../assets/tokens/eth.png";
import usdc from "../../assets/tokens/usdc.png";
import dai from "../../assets/tokens/dai.png";
import usdt from "../../assets/tokens/usdt.png";
import frax from "../../assets/tokens/frax.png";

interface PoolMetadata {
  icon: string;
}

const poolMetadata: Record<string, PoolMetadata> = {
  ETH: {
    icon: eth,
  },
  DAI: {
    icon: dai,
  },
  USDC: {
    icon: usdc,
  },
  USDT: {
    icon: usdt,
  },
  FRAX: {
    icon: frax,
  },
};

export default poolMetadata;

export const oldPoolApys: Record<string, ScaledNumber> = {
  "0x2C681E62De119DdCC8bb7E78D7eB92D6C88BcAFe": ScaledNumber.fromUnscaled(0.0966),
  "0xdAe9AE3064340C8519b663d17e70C3D6912C79Fd": ScaledNumber.fromUnscaled(-0.03090443061),
  "0xdA83E512e2D675B8De524a6d21c86254dC7d47B6": ScaledNumber.fromUnscaled(0.1008),
};
