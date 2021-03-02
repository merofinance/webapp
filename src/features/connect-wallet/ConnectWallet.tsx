import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { injectedConnector } from "../../app/web3";
import { Backd } from "../../lib/backd";

export function ConnectWallet() {
  const history = useHistory();

  const { activate, active } = useWeb3React<Backd>();

  useEffect(() => {
    if (active) {
      history.replace("/");
    }
  }, [active, history]);

  const activateWallet = () => {
    activate(injectedConnector);
  };

  return (
    <>
      <Container>
        <header className="text-center m-4">
          <h1 className="display-4">Welcome to backd</h1>
          <p>Please connect your wallet to start using backd</p>
        </header>
        <main className="text-center">
          <Button onClick={activateWallet}>Connect wallet</Button>
        </main>
      </Container>
    </>
  );
}
