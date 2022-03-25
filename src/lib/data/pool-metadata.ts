import { ScaledNumber } from "scaled-number";

interface DeploymentMetadata {
  time: Date;
}

interface PoolMetadata {
  /*
   * We use the harvestable view for forecaseting APR for the next harvest.
   * But the harvestable view doesn't include appreciation in the Curve LP Token, and additional rewards.
   * This is a multiplier used to mutiply the harvestable amount by, to get what the total amount of underlying would be including everything.
   * This is calculated as [Total APR for pool on Convex] / [APR of CVX and CRV share combined].
   * We will need to update this periodically, however, it only makes a noticable impact when a pool is first deployed.
   * After a few harvests this does not affect the APY much.
   */
  harvestableMultiplier: ScaledNumber;
  deployment: Record<string, DeploymentMetadata>;
}

const poolMetadata: Record<string, PoolMetadata> = {
  BKD: {
    harvestableMultiplier: ScaledNumber.fromUnscaled("9.396551724"),
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
  ETH: {
    harvestableMultiplier: ScaledNumber.fromUnscaled("9.396551724"),
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
    harvestableMultiplier: ScaledNumber.fromUnscaled("1.107981221"),
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
    harvestableMultiplier: ScaledNumber.fromUnscaled("1.107981221"),
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

export default poolMetadata;
