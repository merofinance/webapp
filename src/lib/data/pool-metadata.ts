import eth from "../../assets/tokens/eth.png";
import usdc from "../../assets/tokens/usdc.png";
import dai from "../../assets/tokens/dai.png";

interface DeploymentMetadata {
  block: number;
}

interface PoolMetadata {
  icon: string;
  deployment: Record<string, DeploymentMetadata>;
}

const poolMetadata: Record<string, PoolMetadata> = {
  ETH: {
    icon: eth,
    deployment: { "1337": { block: 1 }, "42": { block: 26866198 } },
  },
  DAI: {
    icon: dai,
    deployment: { "1337": { block: 1 }, "42": { block: 26866188 } },
  },
  USDC: { icon: usdc, deployment: { "1337": { block: 1 } } },
};

export default poolMetadata;
