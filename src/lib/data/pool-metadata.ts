import eth from "../../assets/tokens/eth.png";
import usdc from "../../assets/tokens/usdc.png";
import dai from "../../assets/tokens/dai.png";

interface DeploymentMetadata {
  time: Date;
}

interface PoolMetadata {
  icon: string;
  deployment: Record<string, DeploymentMetadata>;
}

const poolMetadata: Record<string, PoolMetadata> = {
  ETH: {
    icon: eth,
    deployment: {
      "1337": {
        time: new Date(0),
      },
      "42": {
        time: new Date(1629505560000),
      },
    },
  },
  DAI: {
    icon: dai,
    deployment: {
      "1337": {
        time: new Date(0),
      },
      "42": {
        time: new Date(1629505560000),
      },
    },
  },
  USDC: {
    icon: usdc,
    deployment: {
      "1337": {
        time: new Date(0),
      },
    },
  },
};

export default poolMetadata;