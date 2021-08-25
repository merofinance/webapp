import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// Customisable and reusable

const StyledBanner = styled.div`
  width: 100%;
  height: 5.2rem;
  background: var(--gradient);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    height: auto;
    padding: 0.9rem 0;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
  margin-left: 0.4rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-left: 0;
  }
`;

const Link = styled.a`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
  text-decoration: underline;
  margin-left: 0.6rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-left: 0.4rem;
  }
`;

const Banner = (): JSX.Element => {
  const location = useLocation();

  if (location.pathname !== "/") return <></>;

  return (
    <StyledBanner>
      <Content>
        <Text>🎉 Backd is now live on Kovan Testnet.</Text>
        <Text>
          Connect your wallet to begin or read
          <Link
            href="https://backdfund.medium.com/backd-testnet-guide-16540e09c46"
            target="_blank"
            rel="noopener noreferrer"
          >
            the blog post
          </Link>
        </Text>
      </Content>
    </StyledBanner>
  );
};

export default Banner;
