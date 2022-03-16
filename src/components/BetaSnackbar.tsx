import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Pool } from "../lib";
import { dismissBetaSnackbar, selectBetaSnackbarDismissed } from "../state/uiSlice";
import Snackbar from "./Snackbar";
import { Optional } from "../lib/types";

interface Props {
  pool: Optional<Pool>;
}

const BetaSnackbar = ({ pool }: Props): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dismissed = useSelector(selectBetaSnackbarDismissed);

  if (!pool || dismissed || !pool.depositCap.isZero || pool.depositCap.isZero()) return null;

  return (
    <Snackbar
      close={() => dispatch(dismissBetaSnackbar())}
      text={t("components.betaSnackbar", {
        limit: pool.depositCap.toCryptoString(),
        asset: pool.underlying.symbol,
      })}
      link={{
        label: t("components.findOutMore"),
        link: "https://blog.backd.fund/backd-is-live-c90e8dc08f34",
      }}
    />
  );
};

export default BetaSnackbar;
