import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { activateIfAuthorized, injectedConnector } from "../../app/web3";
import { Backd } from "../../lib/backd";
import { isUserConnected, setConnected } from "../user/userSlice";

export function ConnectWallet() {
  const history = useHistory();
  const connected = useSelector(isUserConnected);
  const dispatch = useDispatch<AppDispatch>();

  const { activate, active } = useWeb3React<Backd>();

  useEffect(() => {
    if (connected) {
      activateIfAuthorized({ active, activate });
    }
    if (active && connected) {
      history.replace("/");
    }
  }, [active, history, activate, connected]);

  const activateWallet = () => {
    activate(injectedConnector).then(() => {
      dispatch(setConnected(true));
    });
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
