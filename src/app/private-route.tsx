import { useWeb3React } from "@web3-react/core";
import React, { ReactChild, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isUserConnected } from "../features/user/userSlice";
import { Backd } from "../lib/backd";
import { activateIfAuthorized } from "./web3";

type PrivateRouteProps = {
  children: ReactChild;
} & RouteProps;

export function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const connected = useSelector(isUserConnected);

  const { activate, active } = useWeb3React<Backd>();

  const loggedIn = (connected && active) || loadingStatus;

  useEffect(() => {
    if (!connected) {
      setLoadingStatus(false);
      return;
    }
    activateIfAuthorized({ active, activate }).then(() => {
      setLoadingStatus(false);
    });
  }, [active, activate, connected]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/connect",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
