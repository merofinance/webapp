import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Address } from "../lib/types";
import styled from "styled-components";
import { injectedConnector } from "../app/web3";
import { isConnected, setConnected } from "../features/account/accountSlice";
import GradientText from "../styles/GradientText";

const DesktopConnector = styled.button`
  position: relative;
  transition: transform 0.3s;

  :hover {
    div {
      width: 17.5rem;
      height: 5.6rem;
      border-radius: 2.8rem;
      opacity: 0.6;
    }
  }

  :active {
    div {
      width: 16.5rem;
      height: 4.8rem;
      border-radius: 2.4rem;
      opacity: 0.8;
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const ConnectorButton = styled.button`
  position: relative;
  height: 4.2rem;
  width: 15.8rem;
  border-radius: 2.1rem;
  background-color: var(--main);
  margin: 0.6rem;
`;

const ConnectorText = styled(GradientText)`
  font-weight: 500;
  font-size: 1.5rem;
`;

const Aura = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 17.3rem;
  height: 5.4rem;
  border-radius: 2.7rem;
  transform: translate(-50%, -50%);
  background: var(--gradient);
  opacity: 0.7;
  transition: all 0.3s;
`;

const MobileConnector = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px var(--subtle);
  border-radius: 7px;

  @media (min-width: 601px) {
    display: none;
  }
`;

const DotContainer = styled.div`
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotAura = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--success);
  border-radius: 50%;
  opacity: 0.3;
`;

const DotCenter = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: var(--success);
`;

const Connector = () => {
  const { library: backd, activate } = useWeb3React();
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
    <>
      <DesktopConnector>
        <Aura />
        <ConnectorButton onClick={() => activateWallet()}>
          <ConnectorText>
            {connected
              ? account.slice(0, 5) + "..." + account.slice(account.length - 5)
              : "Connnect wallet"}
          </ConnectorText>
        </ConnectorButton>
      </DesktopConnector>
      <MobileConnector>
        <DotContainer>
          <DotAura />
          <DotCenter />
        </DotContainer>
      </MobileConnector>
    </>
  );
};

export default Connector;
