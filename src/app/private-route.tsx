import { useWeb3React } from "@web3-react/core";
import React, { ReactChild, useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Backd } from "../lib/backd";
import { activateIfAuthorized } from "./web3";

type PrivateRouteProps = {
  children: ReactChild;
} & RouteProps;

export function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  const [loadingStatus, setLoadingStatus] = useState(true);

  const { activate, active } = useWeb3React<Backd>();

  useEffect(() => {
    activateIfAuthorized({ active, activate }).then(() => {
      setLoadingStatus(false);
    });
  }, [active, activate]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        active || loadingStatus ? (
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
