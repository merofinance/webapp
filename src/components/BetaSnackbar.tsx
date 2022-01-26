import { useDispatch, useSelector } from "react-redux";
import { SHIELDED } from "../lib/constants";
import { dismissBetaSnackbar, selectBetaSnackbarDismissed } from "../state/uiSlice";
import Snackbar from "./Snackbar";

const BetaSnackbar = (): JSX.Element => {
  const dispatch = useDispatch();
  const dismissed = useSelector(selectBetaSnackbarDismissed);

  return (
    <Snackbar
      show={!dismissed && SHIELDED}
      close={() => dispatch(dismissBetaSnackbar())}
      text="components.betaSnackbar"
      link={{
        label: "components.findOutMore",
        link: "",
      }}
    />
  );
};

export default BetaSnackbar;
