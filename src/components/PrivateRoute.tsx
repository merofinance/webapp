import React, { ReactChild } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import WalletSelectPopup from "./WalletSelectPopup";

type PrivateRouteProps = {
  children: ReactChild;
} & RouteProps;

export function PrivateRoute({ children }: PrivateRouteProps) {
  const history = useHistory();
  const { active } = useWeb3React();
  return (
    <Route>
      {children}
      <WalletSelectPopup disableBackgroundClose show={!active} close={() => history.push("/")} />
    </Route>
  );
}
