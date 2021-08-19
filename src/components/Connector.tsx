import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { GradientText } from "../styles/GradientText";
import WalletSelectPopup from "./WalletSelectPopup";
import { shortenAddress } from "../lib/text";
import { injectedConnector } from "../app/web3";
import { useBackd } from "../app/hooks/use-backd";

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
  width: ${(props: ConnectedType) => (props.connected ? "auto" : "15.8rem")};
  padding: ${(props: ConnectedType) => (props.connected ? "0 2rem" : "0")};
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

const Connector = (): JSX.Element => {
  const { account, active, activate } = useWeb3React();
  const backd = useBackd();
  const { t } = useTranslation();

  const [connecting, setConnecting] = useState(false);
  const [ens, setEns] = useState("");

  const updateEns = async () => {
    if (!account || !backd) return;
    try {
      const ens = await backd.provider.lookupAddress(account);
      if (ens) {
        setEns(ens);
        return;
      }
    } catch {
      console.log("ENS Not Supported");
    }
    setEns("");
  };

  useEffect(() => {
    updateEns();
  }, [account, backd]);

  const autoConnect = async () => {
    const authorized = await injectedConnector.isAuthorized();
    if (!active && authorized) {
      await activate(injectedConnector);
    }
  };

  useEffect(() => {
    autoConnect();
  }, [autoConnect]);

  return (
    <>
      <DesktopConnector>
        <Aura connected={active} />
        <ConnectorButton onClick={() => setConnecting(true)} connected={active}>
          <ConnectorText>
            {account ? ens || shortenAddress(account, 8) : t("walletConnect.connectWallet")}
          </ConnectorText>
        </ConnectorButton>
      </DesktopConnector>
      <MobileConnector onClick={() => setConnecting(true)}>
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
