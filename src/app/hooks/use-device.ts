import { useEffect, useState } from "react";

interface useDeviceType {
  isMobile: boolean;
  isDesktop: boolean;
  width: number;
}

export const useDevice = (): useDeviceType => {
  const [isMobile, setMobile] = useState(false);
  const [isDesktop, setDesktop] = useState(true);
  const [width, setWidth] = useState(0);

  const refresh = () => {
    const mobile = window.innerWidth <= 600;
    setMobile(mobile);
    setDesktop(!mobile);
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    refresh();
    return () => {
      setMobile(false);
      setDesktop(true);
      setWidth(0);
    };
  }, [refresh]);

  window.addEventListener("resize", refresh);

  return { isMobile, isDesktop, width };
};
