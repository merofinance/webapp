import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { GradientText } from "../styles/GradientText";
import { shortenAddress } from "../lib/text";
import { useBackd } from "../app/hooks/use-backd";
import { chainIds } from "../lib/constants";
import PulsingDot from "./PulsingDot";

const StyledConnectorDesktop = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 715px) {
    display: none;
  }
`;

const Network = styled.div`
  display: flex;
  align-items: center;
  height: 3.2rem;
  border-radius: 1.6rem;
  padding: 0 2rem;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  line-height: 2.8rem;
  font-weight: 500;
  background-color: rgba(137, 102, 246, 0.1);
  margin-right: 1.6rem;
`;

type ConnectedType = {
  connected: boolean;
};

const Border = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, rgba(197, 50, 249, 0.7), rgba(50, 178, 229, 0.7));
  cursor: pointer;

  border-radius: ${(props: ConnectedType) => (props.connected ? "8px" : "2.7rem")};
  padding: ${(props: ConnectedType) => (props.connected ? "1px" : "6px 7px")};
  background: ${(props: ConnectedType) =>
    props.connected
      ? "linear-gradient(to right, var(--primary-gradient) 0%, var(--secondary-gradient) 50%, var(--primary-gradient) 100%)"
      : "linear-gradient(to right, rgba(197, 50, 249, 0.7) 0%, rgba(50, 178, 229, 0.7) 50%, rgba(197, 50, 249, 0.7) 100%)"};

  transition: all 0.5s;
  background-size: 200% auto;

  :hover {
    background-position: right center;

    div {
      background-position: right center;
    }
  }
`;

const Innner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${(props: ConnectedType) => (props.connected ? "4rem" : "4.2rem")};
  padding: ${(props: ConnectedType) => (props.connected ? "0 1.5rem 0 0.9rem" : "0 2.2rem")};
  border-radius: ${(props: ConnectedType) => (props.connected ? "7px" : "2.1rem")};
  background-color: ${(props: ConnectedType) => (props.connected ? "#0A0524" : "var(--main)")};
`;

const ConnectorText = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  letter-spacing: 0.46px;
  margin-left: 0.9rem;

  background: linear-gradient(
    to right,
    var(--primary-gradient) 0%,
    var(--secondary-gradient) 50%,
    var(--primary-gradient) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  transition: all 0.5s;
  background-size: 200% auto;
`;

interface Props {
  connect: () => void;
}

const ConnectorDesktop = ({ connect }: Props): JSX.Element => {
  const { account, active, chainId } = useWeb3React();
  const backd = useBackd();
  const { t } = useTranslation();
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
  }, [account, backd, chainId]);

  return (
    <StyledConnectorDesktop>
      {chainId && chainId !== 1 && chainIds[chainId] && <Network>{chainIds[chainId]}</Network>}
      <Border connected={active}>
        <Innner onClick={() => connect()} connected={active}>
          {active && <PulsingDot success={chainId === 1} />}
          <ConnectorText>
            {account ? ens || shortenAddress(account, 8) : t("walletConnect.connectWallet")}
          </ConnectorText>
        </Innner>
      </Border>
    </StyledConnectorDesktop>
  );
};

export default ConnectorDesktop;
