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
      text="Currently, all pools are in a shielded state. This allows for a maximum TVL of $1m per pool."
      link={{
        label: "Find out more.",
        link: "",
      }}
    />
  );
};

export default BetaSnackbar;
