import { ScaledNumber } from "scaled-number";

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
        time: new Date(1659017112000),
      },
      "1": {
        time: new Date(1656006112000),
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
        time: new Date(1659016212000),
      },
      "1": {
        time: new Date(1659326212000),
      },
    },
  },
  USDC: {
    icon: usdc,
    deployment: {
      "1337": {
        time: new Date(0),
      },
      "42": {
        time: new Date(1659016932000),
      },
      "1": {
        time: new Date(1659326212000),
      },
    },
  },
};

export default poolMetadata;

export const oldPoolMetadata: Record<string, PoolMetadata> = {
  ETH: {
    icon: eth,
    deployment: {
      "1337": {
        time: new Date(0),
      },
      "42": {
        time: new Date(1643997600000),
      },
      "1": {
        time: new Date(1647367666000),
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
        time: new Date(1643997600000),
      },
      "1": {
        time: new Date(1647432774000),
      },
    },
  },
  USDC: {
    icon: usdc,
    deployment: {
      "1337": {
        time: new Date(0),
      },
      "42": {
        time: new Date(1643997600000),
      },
      "1": {
        time: new Date(1647360920000),
      },
    },
  },
};
