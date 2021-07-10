import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useHistory } from "react-router-dom";
import WalletSelectPopup from "./WalletSelectPopup";

const RequireConnection = () => {
  const history = useHistory();
  const { active } = useWeb3React();

  return <WalletSelectPopup show={!active} close={() => {}} exit={() => history.push("/")} />;
};

export default RequireConnection;
