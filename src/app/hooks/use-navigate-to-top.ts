import { To, useNavigate } from "react-router-dom";

/*
 * Navigate to the top of a page so that the scroll position isn't persisted between pages.
 * Use this instead of React Dom's build-in useNavigate.
 * Source: https://stackoverflow.com/a/71444024/13632384
 */
export const useNavigateToTop = (): ((to: string) => void) => {
  const navigate = useNavigate();

  const navigateToTop = (to: string) => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  return navigateToTop;
};
