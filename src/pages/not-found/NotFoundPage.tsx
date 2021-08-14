import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { GradientLink } from "../../styles/GradientText";

const StyledNotFoundPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

const Number = styled.div`
  font-size: 22rem;
  font-weight: 700;
  line-height: 17rem;
  margin-bottom: 4rem;
`;

const Header = styled.h1`
  font-size: 5.2rem;
  font-weight: 700;
  line-height: 6.6rem;
  margin-bottom: 1.6rem;
`;

const SubHeader = styled.p`
  font-size: 2.2rem;
  font-weight: 400;
  line-height: 3rem;
`;

const GetInTouch = styled(GradientLink)`
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 3rem;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;

const InternalLink = styled(Link)`
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 4.3rem;
  text-transform: capitalize;

  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

const ExternalLink = styled(GradientLink)`
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 4.3rem;
  text-transform: capitalize;
`;

const NotFoundPage = () => {
  return (
    <StyledNotFoundPage>
      <Number>404</Number>
      <Header>Page could not be found.</Header>
      <SubHeader>
        Try one of the handy links below - or{" "}
        <GetInTouch href="https://discord.gg/jpGvaFV3Rv" target="_blank">
          get in touch
        </GetInTouch>{" "}
        if you believe there is an issue.
      </SubHeader>
      <LinkContainer>
        <InternalLink to="/">home page</InternalLink>
        <InternalLink to="/">view all pools</InternalLink>
        <InternalLink to="/">claim page</InternalLink>
        <ExternalLink href="https://discord.gg/jpGvaFV3Rv" target="_blank">
          Docs
        </ExternalLink>
      </LinkContainer>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
