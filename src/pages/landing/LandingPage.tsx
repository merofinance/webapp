import React from "react";
import styled from "styled-components";
import { useIsLive } from "../../app/hooks/use-is-live";
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
  const { protocolLive } = useIsLive();

  return (
    <StyledLanding>
      <Seo
        title="Backd - Liquidity Made Reactive"
        description="The DeFi protocol for increasing the yield and utility of your crypto assets with reactive liquidity."
      />
      <Background />
      <Content>
        <Hero />
        <Benefits />
        {protocolLive && <Preview />}
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
