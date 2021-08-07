import { useEffect, useState } from "react";

interface useDeviceType {
  isMobile: boolean;
  isDesktop: boolean;
}

export const useDevice = (): useDeviceType => {
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
