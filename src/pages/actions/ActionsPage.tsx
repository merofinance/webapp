import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocation, useMatch } from "react-router";

import { useBackd } from "../../app/hooks/use-backd";
import { fetchState } from "../../state/poolsListSlice";
import Seo from "../../components/Seo";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import RegisteredActions from "./RegisteredActions";
import Overview from "../../components/Overview";
import ProtectableLoans from "./lending/ProtectableLoans";
import RegisterAction from "./RegisterAction";
import YourDeposits from "./YourDeposits";
import { GradientLink } from "../../styles/GradientText";
import ExistingActions from "./ExistingActions";

const StyledActionsPage = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1220px) {
    flex-direction: column-reverse;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface InfoCardsProps {
  hideMobile: boolean;
}

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1220px) {
    display: ${(props: InfoCardsProps) => (props.hideMobile ? "none" : "flex")};
  }
`;

const ProposeContainer = styled.div`
  width: 100%;
  padding-left: 1.6rem;
  display: flex;
  justify-content: center;

  @media (max-width: 1220px) {
    display: none;
  }
`;

const ProposeLink = styled(GradientLink)`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.46px;
`;

const ActionsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch();
  const updated = useWeb3Updated();
  const isRegister = useMatch("/register");
  const isActions = useMatch("/");
  const location = useLocation();

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  return (
    <StyledActionsPage>
      <Seo title={t("metadata.actions.title")} description={t("metadata.actions.description")} />
      <ContentContainer>
        <Content>
          {isRegister && <RegisterAction />}
          {isActions && (
            <>
              <ProtectableLoans />
              <RegisteredActions />
            </>
          )}
        </Content>
      </ContentContainer>
      <InfoCards hideMobile={location.pathname !== "/actions"}>
        <Overview
          description={
            location.pathname === "/actions"
              ? t("actions.overview")
              : t("actions.register.overview")
          }
          link="https://docs.backd.fund/protocol-architecture/top-ups"
        />
        <YourDeposits />
        <ExistingActions />
        <ProposeContainer>
          <ProposeLink
            href="https://discord.gg/jpGvaFV3Rv"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("actions.propose")}
          </ProposeLink>
        </ProposeContainer>
      </InfoCards>
    </StyledActionsPage>
  );
};

export default ActionsPage;
