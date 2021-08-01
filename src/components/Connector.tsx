import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import styled from "styled-components";
import GradientText from "../styles/GradientText";
import WalletSelectPopup from "./WalletSelectPopup";
import { shortenAddress } from "../lib/text";

type ConnectedType = {
  connected: boolean;
};

const DesktopConnector = styled.div`
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

  @media (max-width: 715px) {
    display: none;
  }
`;

const ConnectorButton = styled.button`
  position: relative;
  cursor: pointer;
  height: 4.2rem;
  width: ${(props: ConnectedType) => (props.connected ? "13.3rem" : "15.8rem")};
  border-radius: ${(props: ConnectedType) => (props.connected ? "1.4rem" : "2.1rem")};
  background-color: ${(props: ConnectedType) => (props.connected ? "none" : "var(--main)")};
  border: ${(props: ConnectedType) =>
    props.connected ? "solid 1px rgba(197, 50, 249, 0.5)" : "none"};
  margin: 0.6rem;
`;

const ConnectorText = styled(GradientText)`
  font-weight: 500;
  font-size: 1.5rem;
  letter-spacing: 0.46px;
`;

const Aura = styled.div`
  display: ${(props: ConnectedType) => (props.connected ? "none" : "flex")};
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

  @media (min-width: 716px) {
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

type Connected = {
  connected: boolean;
};

const DotAura = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props: Connected) => (props.connected ? "var(--success)" : "var(--error)")};
  border-radius: 50%;
  opacity: 0.3;
`;

const DotCenter = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${(props: Connected) => (props.connected ? "var(--success)" : "var(--error)")};
`;

const Connector = () => {
  const { account, active } = useWeb3React();
  const [connecting, setConnecting] = useState(false);

  return (
    <>
      <DesktopConnector>
        <Aura connected={active} />
        <ConnectorButton onClick={() => setConnecting(true)} connected={active}>
          <ConnectorText>{active ? shortenAddress(account!, 8) : "Connnect wallet"}</ConnectorText>
        </ConnectorButton>
      </DesktopConnector>
      <MobileConnector>
        <DotContainer>
          <DotAura connected={active} />
          <DotCenter connected={active} />
        </DotContainer>
      </MobileConnector>
      <WalletSelectPopup show={connecting} close={() => setConnecting(false)} />
    </>
  );
};

export default Connector;
