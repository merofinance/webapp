import { useWeb3React } from "@web3-react/core";
import { LIVE, STAKING_LIVE } from "../../lib/constants";

const LIVE_CHAINS = [42, 1337];

interface FeaturesInformation {
  live: boolean;
  protocolLive: boolean;
  stakingLive: boolean;
}

export const useIsLive = (): FeaturesInformation => {
  if (!LIVE) return { live: false, protocolLive: false, stakingLive: false };

  const { chainId } = useWeb3React();
  if (!chainId) return { live: LIVE, protocolLive: true, stakingLive: false };

  const protocolLive = LIVE_CHAINS.includes(chainId);
  return { live: LIVE, protocolLive, stakingLive: protocolLive && STAKING_LIVE };
};
