import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "./Button";

import Popup from "./Popup";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const WalletContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wallet = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.15px;
  opacity: 0.5;
`;

interface Props {
  show: boolean;
  close: () => void;
  changeWallet: () => void;
  wallet: string;
}

const ConnectionDetails = ({ show, close, changeWallet, wallet }: Props) => {
  const { t } = useTranslation();

  return (
    <Popup
      small
      show={show}
      close={close}
      header={t("walletConnect.details.header")}
      content={
        <Content>
          <WalletContainer>
            <Wallet>{t("walletConnect.details.connected", { wallet: t(wallet) })}</Wallet>
            <Button
              tiny
              text={t("walletConnect.details.change")}
              background="#252140"
              click={changeWallet}
            />
          </WalletContainer>
        </Content>
      }
    />
  );
};

export default ConnectionDetails;
