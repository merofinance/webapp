import React from "react";
import styled from "styled-components";
import { useIsLive } from "../../app/hooks/use-is-live";
import AuditedBy from "./AuditedBy";
import Background from "./Background";
import Benefits from "./Benefits";
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
  const { protocolLive } = useIsLive();
  return (
    <StyledLanding>
      <Background />
      <Content>
        <Hero />
        <Benefits />
        {protocolLive && <Preview />}
        <HowItWorks />
        <SupportedBy />
        <AuditedBy />
        <JoinCommunity />
        <GetStarted />
      </Content>
    </StyledLanding>
  );
};

export default LandingPage;
