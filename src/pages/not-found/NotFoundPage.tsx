import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { GradientLink } from "../../styles/GradientText";
import { useDevice } from "../../app/hooks/use-device";
import { LIVE } from "../../lib/constants";

const StyledNotFoundPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const Number = styled.div`
  font-weight: 700;

  font-size: 22rem;
  line-height: 17rem;
  margin-bottom: 4rem;
  @media (max-width: 600px) {
    font-size: 15rem;
    line-height: 12rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
`;

const Header = styled.h1`
  font-weight: 700;
  margin-bottom: 1.6rem;
  text-align: center;

  font-size: 5.2rem;
  line-height: 6.6rem;
  @media (max-width: 600px) {
    font-size: 3.6rem;
    line-height: 4.6rem;
  }
`;

const SubHeader = styled.p`
  font-weight: 400;
  text-align: center;

  font-size: 2.2rem;
  line-height: 3rem;
  @media (max-width: 600px) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
`;

const GetInTouch = styled(GradientLink)`
  font-weight: 600;

  font-size: 2.2rem;
  line-height: 3rem;
  @media (max-width: 600px) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;

const InternalLink = styled(Link)`
  font-weight: 600;
  text-transform: capitalize;

  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;

  font-size: 2.5rem;
  line-height: 4rem;
  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 3.3rem;
  }
`;

const ExternalLink = styled(GradientLink)`
  font-weight: 600;
  text-transform: capitalize;

  font-size: 2.5rem;
  line-height: 4rem;
  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 3.3rem;
  }
`;

const NotFoundPage = () => {
  const { isMobile } = useDevice();

  return (
    <StyledNotFoundPage>
      <Number id="not-found-number">404</Number>
      <Header>{isMobile ? "Page not found" : "Page could not be found."}</Header>
      <SubHeader>
        Try one of the handy links below - or{" "}
        <GetInTouch id="not-found-support" href="https://discord.gg/jpGvaFV3Rv" target="_blank">
          get in touch
        </GetInTouch>{" "}
        if you believe there is an issue.
      </SubHeader>
      <LinkContainer>
        <InternalLink id="not-found-home" to="/">
          home page
        </InternalLink>
        {LIVE && (
          <InternalLink id="not-found-pools" to="/pools">
            view all pools
          </InternalLink>
        )}
        {LIVE && (
          <InternalLink id="not-found-claim" to="/claim">
            claim page
          </InternalLink>
        )}
        <ExternalLink id="not-found-docs" href="https://docs.backd.fund/" target="_blank">
          Docs
        </ExternalLink>
      </LinkContainer>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
