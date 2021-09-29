import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { useBackd } from "../../app/hooks/use-backd";
import { fetchState } from "../../state/poolsListSlice";
import Seo from "../../components/Seo";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import RegisteredActions from "./RegisteredActions";
import Overview from "../../components/Overview";
import LendingInformation from "./lending/LendingInformation";
import ProtectableLoans from "./lending/ProtectableLoans";

const StyledActionsPage = styled.div`
  width: 100%;
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
`;

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch();
  const updated = useWeb3Updated();

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  return (
    <StyledActionsPage>
      <Seo title="Backd Actions" description="TODO" />
      <ContentContainer>
        <Content>
          <ProtectableLoans />
          <RegisteredActions />
        </Content>
      </ContentContainer>
      <InfoCards>
        <Overview description={t("actions.lending.overview")} link="https://docs.backd.fund/" />
        <LendingInformation />
      </InfoCards>
    </StyledActionsPage>
  );
};

export default ActionsPage;
