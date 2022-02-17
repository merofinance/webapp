import { useWeb3React } from "@web3-react/core";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import LaunchIcon from "@material-ui/icons/Launch";
import { AbstractConnector } from "@web3-react/abstract-connector";
import Web3 from "web3";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";

import { injectedConnector, walletConnectConnector, privateKeyConnector } from "../app/web3";
import metamask from "../assets/wallets/metamask.svg";
import walletConnect from "../assets/wallets/wallet-connect.svg";
import Popup from "./Popup";
import { setUnsupportedNetwork } from "../state/errorSlice";

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
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  text-align: center;
  margin-right: 0.5rem;

  @media (max-width: 600px) {
    margin-bottom: 0.2rem;
  }
`;

const Highlight = styled.a`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  text-align: center;
  cursor: pointer;
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  > svg {
    margin-left: 0.3rem;
    transform: translateY(2px);
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
  const dispatch = useDispatch();
  const { activate } = useWeb3React();
  const { t } = useTranslation();

  const connect = async (connector: AbstractConnector, walletName: string) => {
    if ((window as any).testing) {
      const web3 = new Web3((window as any).web3.currentProvider);
      const provider = new ethers.providers.Web3Provider(web3.eth.currentProvider as any, "any");
      (window as any).ethereum = provider;
      await activate(privateKeyConnector);
    } else {
      const result = await activate(connector);
      if (result === undefined) dispatch(setUnsupportedNetwork());
    }
    setWallet(walletName);
    close(true);
  };

  return (
    <Popup centerHeader show={show} close={() => close(false)} header={t("walletConnect.header")}>
      <SubHeaderContainer>
        <SubHeader>{t("walletConnect.newToEthereum")}</SubHeader>
        <Highlight
          id="wallet-select-link"
          href="https://ethereum.org/en/wallets/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("walletConnect.aboutWallets")}
          <LaunchIcon style={{ fill: "var(--secondary)" }} />
        </Highlight>
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
