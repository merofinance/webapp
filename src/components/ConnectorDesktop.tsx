import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { GradientText } from "../styles/GradientText";
import { shortenAddress } from "../lib/text";
import { useBackd } from "../app/hooks/use-backd";
import { chainIds } from "../lib/constants";

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

const ButtonContainer = styled.div`
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
      <ButtonContainer>
        <Aura connected={active} />
        <ConnectorButton onClick={() => connect()} connected={active}>
          <ConnectorText>
            {account ? ens || shortenAddress(account, 8) : t("walletConnect.connectWallet")}
          </ConnectorText>
        </ConnectorButton>
      </ButtonContainer>
    </StyledConnectorDesktop>
  );
};

export default ConnectorDesktop;
