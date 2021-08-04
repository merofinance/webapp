import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const LIVE_CHAINS = [42, 1337];

export const useIsLive = (): boolean => {
  const { chainId } = useWeb3React();
  if (!chainId) return false;
  return LIVE_CHAINS.indexOf(chainId) > -1;
};

export const useDevice = () => {
  const [isMobile, setMobile] = useState(false);
  const [isDesktop, setDesktop] = useState(true);

  const refresh = () => {
    const mobile = window.innerWidth <= 600;
    setMobile(mobile);
    setDesktop(!mobile);
  };

  useEffect(refresh, [refresh]);

  window.addEventListener("resize", refresh);

  return { isMobile, isDesktop };
};
