import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import InfoCard from "../../components/InfoCard";
import { selectPositions } from "../../state/positionsSlice";
import { Position } from "../../lib/types";
import ExistingAction from "./ExistingAction";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const EmptyText = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 0.46px;
  opacity: 0.8;
  width: 100%;
`;

const Headers = styled.div`
  width: 100%;
  display: flex;
  opacity: 0.6;
`;

interface HeaderProps {
  flex: number;
}

const Header = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.15px;
  flex: ${(props: HeaderProps) => props.flex};
`;

const ExistingActions = (): JSX.Element => {
  const { t } = useTranslation();
  const positions = useSelector(selectPositions);
  const location = useLocation();

  const hasPosition = positions.length > 0;

  if (location.pathname === "/actions") return <div />;

  return (
    <InfoCard
      id="existing-actions"
      defaultOpen
      collapsible
      header={t("actions.registered.existing")}
      content={
        <Content>
          {!hasPosition && (
            <EmptyText id="existing-actions-empty">{t("actions.registered.empty")}</EmptyText>
          )}
          {hasPosition && (
            <>
              <Headers>
                <Header flex={5}>{t("actions.registered.columns.type")}</Header>
                <Header flex={3}>{t("actions.registered.columns.lockedShort")}</Header>
                <Header flex={2} />
              </Headers>
              {positions.map((position: Position) => (
                <ExistingAction position={position} />
              ))}
            </>
          )}
        </Content>
      }
    />
  );
};

export default ExistingActions;
