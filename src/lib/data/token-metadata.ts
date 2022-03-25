import eth from "../../assets/tokens/eth.png";
import usdc from "../../assets/tokens/usdc.png";
import dai from "../../assets/tokens/dai.png";
import bkd from "../../assets/tokens/bkd.png";

interface TokenMetadata {
  icon: string;
}

const tokenMetadata: Record<string, TokenMetadata> = {
  BKD: {
    icon: bkd,
  },
  ETH: {
    icon: eth,
  },
  DAI: {
    icon: dai,
  },
  USDC: {
    icon: usdc,
  },
};

export default tokenMetadata;
