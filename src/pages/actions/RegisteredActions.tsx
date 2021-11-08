import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import ContentSection from "../../components/ContentSection";
import { Position } from "../../lib/types";
import { selectPositions } from "../../state/positionsSlice";
import Button from "../../components/Button";
import RegisteredAction from "./RegisteredAction";
import { useDevice } from "../../app/hooks/use-device";

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Empty = styled.div`
  letter-spacing: 0.46px;
  opacity: 0.8;

  font-size: 1.5rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 6rem;
  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const RegisteredActions = () => {
  const { t } = useTranslation();
  const positions = useSelector(selectPositions);
  const history = useHistory();
  const { isMobile } = useDevice();

  const hasPosition = positions && positions.length > 0;

  return (
    <ContentSection
      header={t("actions.registered.header")}
      content={
        <Content>
          {!hasPosition && (
            <Empty id="register-positions-empty">{t("actions.registered.empty")}</Empty>
          )}
          {hasPosition &&
            positions &&
            positions.map((position: Position) => <RegisteredAction position={position} />)}
          <ButtonContainer>
            <Button
              id="register-action-button"
              primary={!hasPosition}
              medium
              width={isMobile ? "100%" : "44%"}
              background="#0F0830"
              text={t("actions.register.button")}
              click={() => history.push("/actions/register")}
            />
          </ButtonContainer>
        </Content>
      }
    />
  );
};

export default RegisteredActions;
