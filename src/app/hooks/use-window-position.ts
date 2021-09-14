import { useLayoutEffect, useState } from "react";

export const useWindowPosition = () => {
  const [scrollPosition, setPosition] = useState(0);
  useLayoutEffect(() => {
    const updatePosition = () => {
      setPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return scrollPosition;
};
