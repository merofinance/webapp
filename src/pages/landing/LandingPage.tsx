import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Seo from "../../components/Seo";
import Background from "./Background";
import Benefits from "./Benefits";
import FutureActions from "./FutureActions";
import GetStarted from "./GetStarted";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import JoinCommunity from "./JoinCommunity";
import Preview from "./Preview";
import SupportedBy from "./SupportedBy";

const StyledLanding = styled.div`
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledLanding>
      <Seo title={t("metadata.landing.title")} description={t("metadata.landing.description")} />
      <Background />
      <Content>
        <Hero />
        <Benefits />
        <Preview />
        <HowItWorks />
        <FutureActions />
        <SupportedBy />
        <JoinCommunity />
        <GetStarted />
      </Content>
    </StyledLanding>
  );
};

export default LandingPage;
