import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissBetaSnackbar, selectBetaSnackbarDismissed } from "../state/uiSlice";
import Snackbar from "./Snackbar";

const BetaSnackbar = () => {
  const dispatch = useDispatch();
  const dismissed = useSelector(selectBetaSnackbarDismissed);

  return (
    <Snackbar
      show={!dismissed && true}
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
