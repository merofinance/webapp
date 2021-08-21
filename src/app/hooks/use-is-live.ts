import { useWeb3React } from "@web3-react/core";
import { STAKING_LIVE } from "../../lib/constants";

const LIVE_CHAINS = [42, 1337];

interface FeaturesInformation {
  protocolLive: boolean;
  stakingLive: boolean;
}

export const useIsLive = (): FeaturesInformation => {
  const { chainId } = useWeb3React();

  const protocolLive = !!chainId && LIVE_CHAINS.includes(chainId);
  return { protocolLive, stakingLive: protocolLive && STAKING_LIVE };
};
