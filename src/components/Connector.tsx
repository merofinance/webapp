import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Address } from "../lib/types";
import styled from "styled-components";
import { injectedConnector } from "../app/web3";
import { isConnected, setConnected } from "../features/account/accountSlice";

const StyledConnector = styled.button`
  position: relative;
`;

const ConnectorButton = styled.button`
  position: relative;
  height: 4.2rem;
  width: 15.8rem;
  border-radius: 2.1rem;
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--primary);
  background-color: var(--main);
`;

const Aura = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 17.3rem;
  height: 5.4rem;
  border-radius: 2.7rem;
  transform: translate(-50%, -50%);
  background-color: var(--primary);
  opacity: 0.7;
`;

const Connector = () => {
  const { library: backd, activate, active, deactivate } = useWeb3React();
  const [account, setAccount] = useState<Address>("");
  const connected = useSelector(isConnected);
  const dispatch = useDispatch();

  const activateWallet = () => {
    activate(injectedConnector).then(() => {
      dispatch(setConnected(true));
    });
  };

  useEffect(() => {
    if (!backd) return;
    backd.currentAccount().then(setAccount);
  }, [backd]);

  return (
    <StyledConnector>
      <Aura />
      <ConnectorButton onClick={() => activateWallet()}>
        {connected
          ? account.slice(0, 5) + "..." + account.slice(account.length - 5)
          : "Connnect wallet"}
      </ConnectorButton>
    </StyledConnector>
  );
};

export default Connector;
