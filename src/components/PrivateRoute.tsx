import React, { ReactChild } from "react";
import { Route, RouteProps } from "react-router-dom";
import RequireConnection from "./RequireConnection";

type PrivateRouteProps = {
  children: ReactChild;
} & RouteProps;

export function PrivateRoute({ children }: PrivateRouteProps) {
  return (
    <Route>
      {children}
      <RequireConnection />
    </Route>
  );
}
