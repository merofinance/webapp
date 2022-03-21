import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import ContentSection from "../../components/ContentSection";
import { Position } from "../../lib/types";
import { selectPositions } from "../../state/positionsSlice";
import Button from "../../components/Button";
import RegisteredAction from "./RegisteredAction";
import { useNavigateToTop } from "../../app/hooks/use-navigate-to-top";

const Empty = styled.div`
  letter-spacing: 0.46px;
  opacity: 0.8;

  font-size: 1.5rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 6rem;
  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const RegisteredActions = (): JSX.Element => {
  const { t } = useTranslation();
  const positions = useSelector(selectPositions) || [];
  const navigate = useNavigateToTop();

  const hasPosition = positions.length > 0;

  return (
    <div>
      <ContentSection header={t("actions.registered.header")}>
        {!hasPosition && (
          <Empty id="register-positions-empty">{t("actions.registered.empty")}</Empty>
        )}
        {positions.map((position: Position) => (
          <RegisteredAction key={position.protocol} position={position} />
        ))}
        <ButtonContainer>
          <Button
            id="register-action-button"
            primary={!hasPosition}
            medium
            width="30rem"
            background="#0F0830"
            click={() => navigate("/actions/register")}
          >
            {t("actions.register.button")}
          </Button>
        </ButtonContainer>
      </ContentSection>
    </div>
  );
};

export default RegisteredActions;
