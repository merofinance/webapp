import { ScaledNumber } from "scaled-number";

import eth from "../../assets/tokens/eth.png";
import usdc from "../../assets/tokens/usdc.png";
import dai from "../../assets/tokens/dai.png";
import usdt from "../../assets/tokens/usdt.png";
import frax from "../../assets/tokens/frax.png";

export interface PoolMetadata {
  icon: string;
  symbol: string;
  aaveStableDebtToken: string;
  aaveVariableDebtToken: string;
}

const POOL_METADATA: PoolMetadata[] = [
  {
    symbol: "FRAX",
    icon: frax,
    aaveStableDebtToken: "0x3916e3B6c84b161df1b2733dFfc9569a1dA710c2",
    aaveVariableDebtToken: "0xfE8F19B17fFeF0fDbfe2671F248903055AFAA8Ca",
  },
  {
    symbol: "USDT",
    icon: usdt,
    aaveStableDebtToken: "0xe91D55AB2240594855aBd11b3faAE801Fd4c4687",
    aaveVariableDebtToken: "0x531842cEbbdD378f8ee36D171d6cC9C4fcf475Ec",
  },
  {
    symbol: "ETH",
    icon: eth,
    aaveStableDebtToken: "0x4e977830ba4bd783C0BB7F15d3e243f73FF57121",
    aaveVariableDebtToken: "0xF63B34710400CAd3e044cFfDcAb00a0f32E33eCf",
  },
  {
    symbol: "DAI",
    icon: dai,
    aaveStableDebtToken: "0x778A13D3eeb110A4f7bb6529F99c000119a08E92",
    aaveVariableDebtToken: "0x6C3c78838c761c6Ac7bE9F59fe808ea2A6E4379d",
  },
  {
    symbol: "USDC",
    icon: usdc,
    aaveStableDebtToken: "0xE4922afAB0BbaDd8ab2a88E0C79d884Ad337fcA6",
    aaveVariableDebtToken: "0x619beb58998eD2278e08620f97007e1116D5D25b",
  },
];

export default POOL_METADATA;

export const oldPoolApys: Record<string, ScaledNumber> = {
  "0x2C681E62De119DdCC8bb7E78D7eB92D6C88BcAFe": ScaledNumber.fromUnscaled(0.0966),
  "0xdAe9AE3064340C8519b663d17e70C3D6912C79Fd": ScaledNumber.fromUnscaled(-0.03090443061),
  "0xdA83E512e2D675B8De524a6d21c86254dC7d47B6": ScaledNumber.fromUnscaled(0.1008),
};
