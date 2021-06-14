import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { injectedConnector } from "../app/web3";
import { setConnected } from "../features/account/accountSlice";
import Popup from "./Popup";
import walletConnect from "../assets/wallets/wallet-connect.svg";
import metamask from "../assets/wallets/metamask.svg";
import GradientText from "../styles/GradientText";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const SubHeaderContainer = styled.div`
  display: flex;
  margin: auto;
  margin-bottom: 6rem;
`;

const SubHeader = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  text-align: center;
  margin-right: 0.5rem;
`;

const Highlight = styled(GradientText)`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  text-align: center;
  cursor: pointer;
`;

type OptionProps = {
  leftColor: string;
  rightColor: string;
};

const Option = styled.button`
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
      props.close();
    });
  };

  return (
    <Popup
      show={props.show}
      close={props.close}
      header="Connect your wallet"
      content={
        <Content>
          <SubHeaderContainer>
            <SubHeader>New to Ethereum?</SubHeader>
            <Highlight
              onClick={() => {
                (window as any).open("https://google.com/", "_blank").focus();
              }}
            >
              Find out about wallets
            </Highlight>
          </SubHeaderContainer>
          <Option leftColor="#FF5407" rightColor="#FFD523" onClick={() => activateWallet()}>
            <Name>MetaMask</Name>
            <IconContainer>
              <Icon src={metamask} />
            </IconContainer>
          </Option>
          <Option leftColor="#8400FE" rightColor="#0C00FE" onClick={() => activateWallet()}>
            <Name>WalletConnect</Name>
            <IconContainer>
              <Icon src={walletConnect} />
            </IconContainer>
          </Option>
        </Content>
      }
    />
  );
};

export default WalletSelectPopup;
