import React from "react";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <>
      <section className="top">
        <h1 className="display-4">Interest earning liquidation protection</h1>
        <p>
          Liquidations are avoidable. backd is a trustless and interest
          generating protocol designed to prevent collateralized loans from
          becoming liquidable.
        </p>
      </section>
      <div className="enter-app text-center">
        <Link to="/app" className="btn btn-primary btn-lg">
          Enter app
        </Link>
      </div>
    </>
  );
}
