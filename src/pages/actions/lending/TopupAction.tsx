import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Popup from "../../../components/Popup";
import { Pool, Position } from "../../../lib/types";
import TopupInformation from "./TopupInformation";
import deleteIcon from "../../../assets/ui/delete.svg";
import DeletePositionConfirmation from "./DeleteTopupConfirmation";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DeleteButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.8rem;
  border-radius: 1.5rem;
  border: solid 1px var(--error);
  margin-top: 2.4rem;
  cursor: pointer;
`;

const DeleteIcon = styled.img`
  height: 1.4rem;
  margin-right: 0.7rem;
`;

const DeleteText = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  letter-spacing: 0.46px;
  color: var(--error);
`;

interface Props {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
}

const TopupAction = ({ show, close, position, pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <Popup
        id="topup-action"
        show={show}
        close={close}
        header={t("actions.topup.label")}
        content={
          <Content>
            <TopupInformation position={position} pool={pool} />
            <DeleteButton id="delete-action-button" onClick={() => setDeleting(true)}>
              <DeleteIcon src={deleteIcon} alt="delete button" />
              <DeleteText>{t("actions.topup.delete.header")}</DeleteText>
            </DeleteButton>
          </Content>
        }
      />
      <DeletePositionConfirmation
        show={deleting}
        close={() => setDeleting(false)}
        position={position}
        pool={pool}
        complete={close}
      />
    </>
  );
};

export default TopupAction;
