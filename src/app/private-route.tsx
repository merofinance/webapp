import { useWeb3React } from "@web3-react/core";
import React, { ReactChild } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Backd } from "../lib/backd";

type PrivateRouteProps = {
  children: ReactChild;
} & RouteProps;

export function PrivateRoute({ children, ...rest }: PrivateRouteProps): JSX.Element {
  const { active } = useWeb3React<Backd>();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        active ? (
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
