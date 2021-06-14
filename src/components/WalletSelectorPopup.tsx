import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { injectedConnector } from "../app/web3";
import { setConnected } from "../features/account/accountSlice";
import Popup from "./Popup";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

type Props = {
  show: boolean;
  close: () => void;
};

const WalletSelectorPopup = (props: Props) => {
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
          <button onClick={() => activateWallet()}>conect</button>
        </Content>
      }
    />
  );
};

export default WalletSelectorPopup;
