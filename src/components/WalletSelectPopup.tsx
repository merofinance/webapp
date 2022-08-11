import { useWeb3React } from "@web3-react/core";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { AbstractConnector } from "@web3-react/abstract-connector";
import Web3 from "web3";
import { ethers } from "ethers";

import {
  injectedConnector,
  walletConnectConnector,
  privateKeyConnector,
  unstoppableDomainsConnector,
} from "../app/web3";
import metamask from "../assets/wallets/metamask.svg";
import walletConnect from "../assets/wallets/wallet-connect.svg";
import Popup from "./Popup";
import ExternalLink from "./ExternalLink";

interface WalletOption {
  name: string;
  icon: string;
  leftColor: string;
  rightColor: string;
  connector: AbstractConnector;
}

const walletOptions: WalletOption[] = [
  {
    name: "walletConnect.wallets.metaMask",
    icon: metamask,
    leftColor: "#FF5407",
    rightColor: "#FFD523",
    connector: injectedConnector,
  },
  {
    name: "walletConnect.wallets.walletConnect",
    icon: walletConnect,
    leftColor: "#8400FE",
    rightColor: "#0C00FE",
    connector: walletConnectConnector,
  },
  {
    name: "walletConnect.wallets.unstoppableDomains",
    icon: walletConnect,
    leftColor: "#0D67FE",
    rightColor: "#09C9FF",
    connector: unstoppableDomainsConnector,
  },
];

const SubHeaderContainer = styled.div`
  display: flex;
  margin: auto;

  margin-bottom: 6rem;
  @media (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`;

const SubHeader = styled.div`
  font-weight: 400;
  letter-spacing: 0.15px;
  text-align: center;
  margin-right: 0.5rem;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 0.2rem;
  }
`;

interface OptionProps {
  leftColor: string;
  rightColor: string;
}

const Option = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1.4rem;
  background: linear-gradient(
    to right,
    ${(props: OptionProps) => props.leftColor},
    ${(props: OptionProps) => props.rightColor}
  );
  margin-top: 1.2rem;
  cursor: pointer;

  padding: 1.9rem 2.2rem;
  @media (max-width: 600px) {
    padding: 1.5rem 2rem;
  }

  transform: scale(1);
  /* opacity: 1; */
  transition: all 0.4s;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0);
  :hover {
    transform: scale(1.015);
    /* opacity: 0.8; */
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Name = styled.div`
  line-height: 2.8rem;

  font-weight: 700;
  font-size: 2.1rem;
  @media (max-width: 600px) {
    font-weight: 700;
    font-size: 2rem;
  }
`;

const IconContainer = styled.div`
  width: 5.4rem;
  height: 3.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

interface Props {
  show: boolean;
  close: (connected: boolean) => void;
  setWallet: (wallet: string) => void;
}

const WalletSelectPopup = ({ show, close, setWallet }: Props): JSX.Element => {
  const { chainId, activate } = useWeb3React();
  const { t } = useTranslation();

  const connect = async (connector: AbstractConnector, walletName: string) => {
    if ((window as any).testing) {
      const web3 = new Web3((window as any).web3.currentProvider);
      const provider = new ethers.providers.Web3Provider(web3.eth.currentProvider as any, "any");
      (window as any).ethereum = provider;
      await activate(privateKeyConnector);
    } else {
      await activate(connector);
    }
    setWallet(walletName);
    close(true);
  };

  return (
    <Popup centerHeader show={show} close={() => close(false)} header={t("walletConnect.header")}>
      <SubHeaderContainer>
        <SubHeader>{t("walletConnect.newToEthereum")}</SubHeader>
        <ExternalLink large id="wallet-select-link" link="https://ethereum.org/en/wallets/">
          {t("walletConnect.aboutWallets")}
        </ExternalLink>
      </SubHeaderContainer>

      {walletOptions.map((option: WalletOption) => (
        <Option
          id={option.name}
          key={option.name}
          leftColor={option.leftColor}
          rightColor={option.rightColor}
          onClick={() => connect(option.connector, option.name)}
        >
          <Name>{t(option.name)}</Name>
          <IconContainer>
            <Icon src={option.icon} alt={`${option.name} logo`} />
          </IconContainer>
        </Option>
      ))}
    </Popup>
  );
};

export default WalletSelectPopup;
