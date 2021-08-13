import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import WalletSelectPopup from "./WalletSelectPopup";
import { Backd } from "../lib/backd";

export const ConnectWallet = (): JSX.Element => {
  const history = useHistory();
  const { active } = useWeb3React<Backd>();

  useEffect(() => {
    if (active) history.replace("/");
  }, [active, history]);

  return <WalletSelectPopup show={!active} close={() => history.push("/")} />;
};
