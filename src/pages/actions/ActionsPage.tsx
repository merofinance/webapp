import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { useBackd } from "../../app/hooks/use-backd";
import { fetchState } from "../../state/poolsListSlice";
import Seo from "../../components/Seo";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import RegisteredActions from "./RegisteredActions";
import Overview from "../../components/Overview";
import ProtectableLoans from "./lending/ProtectableLoans";
import RegisterAction from "./RegisterAction";

interface ActionParams {
  stage: string;
}

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
  flex-direction: column;
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
  const { stage } = useParams<ActionParams>();

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  return (
    <StyledActionsPage>
      <Seo title="Backd Actions" description="TODO" />
      <ContentContainer>
        <Content>
          {!stage && (
            <>
              <ProtectableLoans />
              <RegisteredActions />
            </>
          )}
          {stage && <RegisterAction />}
        </Content>
      </ContentContainer>
      <InfoCards>
        <Overview description={t("actions.lending.overview")} link="https://docs.backd.fund/" />
      </InfoCards>
    </StyledActionsPage>
  );
};

export default ActionsPage;
