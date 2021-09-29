import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import ContentSection from "../../components/ContentSection";
import { Position } from "../../lib/types";
import { selectPositions } from "../../state/positionsSlice";
import Button from "../../components/Button";

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Empty = styled.div`
  font-size: 1.5rem;
  line-height: 2.1rem;
  letter-spacing: 0.46px;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisteredActions = () => {
  const { t } = useTranslation();
  const positions = useSelector(selectPositions);
  const history = useHistory();

  return (
    <ContentSection
      header={t("actions.registered.header")}
      content={
        <Content>
          {/* TODO Check the styling of this */}
          {positions.length === 0 && <Empty>{t("actions.registered.empty")}</Empty>}
          {/* TODO Add the position */}
          {positions.length > 0 && positions.map((position: Position) => <div>Cool position</div>)}
          <ButtonContainer>
            <Button
              primary
              medium
              width="44%"
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
