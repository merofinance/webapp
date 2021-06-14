import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { injectedConnector } from "../app/web3";
import { setConnected } from "../features/account/accountSlice";
import Popup from "./Popup";
import walletConnect from "../assets/wallets/wallet-connect.svg";
import metamask from "../assets/wallets/metamask.svg";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

type OptionProps = {
  leftColor: string;
  rightColor: string;
};

const Option = styled.div`
  width: 100%;
  padding: 1.9rem 2.2rem;
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
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 2.8rem;
`;

const Icon = styled.img`
  height: 3.6rem;
`;

type Props = {
  show: boolean;
  close: () => void;
};

const WalletSelectPopup = (props: Props) => {
  const dispatch = useDispatch();
  const { activate } = useWeb3React();

  const activateWallet = () => {
    activate(injectedConnector).then(() => {
      dispatch(setConnected(true));
    });
  };

  return (
    <Popup
      show={props.show}
      close={props.close}
      header="Connect your wallet"
      content={
        <Content>
          <Option leftColor="#FF5407" rightColor="#FFD523" onClick={() => activateWallet()}>
            <Name>MetaMask</Name>
            <Icon src={metamask} />
          </Option>
          <Option leftColor="#8400FE" rightColor="#0C00FE" onClick={() => activateWallet()}>
            <Name>WalletConnect</Name>
            <Icon src={walletConnect} />
          </Option>
        </Content>
      }
    />
  );
};

export default WalletSelectPopup;
