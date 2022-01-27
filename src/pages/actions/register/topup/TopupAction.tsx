import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Popup from "../../../../components/Popup";
import { Pool, Position } from "../../../../lib/types";
import TopupInformation from "./TopupInformation";
import deleteIcon from "../../../../assets/ui/delete.svg";
import DeletePositionConfirmation from "./DeleteTopupConfirmation";
import {
  removeSuggestion,
  selectActiveSuggestion,
  SuggestionType,
} from "../../../../state/helpSlice";

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
  const dispatch = useDispatch();
  const implement = useSelector(selectActiveSuggestion);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (
      implement &&
      implement.type === SuggestionType.POSITION_LOW &&
      implement.data === position.protocol.toLowerCase()
    ) {
      setDeleting(true);
      dispatch(removeSuggestion(implement.type));
    }
    return () => {
      setDeleting(false);
    };
  }, [implement]);

  return (
    <>
      <Popup
        id="topup-action"
        show={show && !deleting}
        close={close}
        header={t("actions.topup.label")}
      >
        <TopupInformation position={position} pool={pool} />
        <DeleteButton id="delete-action-button" onClick={() => setDeleting(true)}>
          <DeleteIcon src={deleteIcon} alt="delete button" />
          <DeleteText>{t("actions.topup.delete.header")}</DeleteText>
        </DeleteButton>
      </Popup>
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
