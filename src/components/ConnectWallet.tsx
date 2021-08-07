import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { activateIfAuthorized } from "../app/web3";
import WalletSelectPopup from "./WalletSelectPopup";
import { Backd } from "../lib/backd";
import { isConnected } from "../state/accountSlice";

export const ConnectWallet = (): JSX.Element => {
  const history = useHistory();
  const connected = useSelector(isConnected);

  const { activate, active } = useWeb3React<Backd>();

  useEffect(() => {
    if (connected) {
      activateIfAuthorized({ active, activate });
    }
    if (active && connected) {
      history.replace("/");
    }
  }, [active, history, activate, connected]);

  return <WalletSelectPopup show={!active} close={() => history.push("/")} />;
};
