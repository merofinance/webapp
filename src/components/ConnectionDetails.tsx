import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Popup from "./Popup";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  show: boolean;
  close: () => void;
}

const ConnectionDetails = ({ show, close }: Props) => {
  const { t } = useTranslation();

  return (
    <Popup
      small
      show={show}
      close={close}
      header={t("walletConnect.details.header")}
      content={<Content>meow</Content>}
    />
  );
};

export default ConnectionDetails;
