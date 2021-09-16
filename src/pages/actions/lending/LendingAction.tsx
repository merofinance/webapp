import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Seo from "../../../components/Seo";
import Overview from "../../../components/Overview";
import LendingInformation from "./LendingInformation";
import { selectAave } from "../../../state/lendingSlice";
import LendingCard from "./LendingCard";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1439px) {
    flex-direction: column-reverse;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LendingData = styled.div`
  border: solid 1px red;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
`;

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
`;

const LendingAction = (): JSX.Element => {
  const { t } = useTranslation();
  const aave = useSelector(selectAave);

  return (
    <StyledPoolsPage>
      <Content>
        <LendingCard lending={aave} />
        <LendingCard lending={aave} />
      </Content>
      <InfoCards>
        <Overview description={t("actions.lending.overview")} link="https://docs.backd.fund/" />
        <LendingInformation />
      </InfoCards>
    </StyledPoolsPage>
  );
};

export default LendingAction;
