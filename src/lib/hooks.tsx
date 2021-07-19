import { useWeb3React } from "@web3-react/core";

const LIVE_CHAINS = [42, 1337];

export const useIsLive = (): boolean => {
  const { chainId } = useWeb3React();
  if (!chainId) return false;
  return LIVE_CHAINS.indexOf(chainId) > -1;
};
