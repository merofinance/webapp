import { useWeb3React } from "@web3-react/core";
import { STAKING_LIVE } from "../../lib/constants";

const LIVE_CHAINS = [42, 1337];

interface FeaturesInformation {
  chainSupported: boolean;
  stakingLive: boolean;
}

export const useIsLive = (): FeaturesInformation => {
  const { chainId } = useWeb3React();

  const chainSupported = !!chainId && LIVE_CHAINS.includes(chainId);
  return { chainSupported, stakingLive: chainSupported && STAKING_LIVE };
};
