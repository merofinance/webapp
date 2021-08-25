import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../assets/logo/logo.svg";
import Connector from "./Connector";
import NavItems from "./NavItems";

type HeaderProps = {
  isSticky: boolean;
};

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8rem;
  z-index: 1;
  transition: all 0.3s;

  background-color: ${(props: HeaderProps) => (props.isSticky ? "#120e2c" : "transparent")};
  box-shadow: -4px 0px 4px rgba(0, 0, 0, ${(props: HeaderProps) => (props.isSticky ? "0.25" : "0")});

  @media (max-width: 600px) {
    margin-bottom: 0;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 5.2rem;
  background: var(--gradient);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
`;

const BannerLink = styled.a`
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.2rem;
  text-decoration: underline;
  margin-left: 0.6rem;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.4rem 12.4rem;

  @media (max-width: 600px) {
    padding: 2.3rem 1.6rem;
  }

  @media (min-width: 601px) and (max-width: 1224px) {
    padding: 2.4rem 4rem;
  }
`;

const Logo = styled.img`
  height: 4.8rem;
  cursor: pointer;

  @media (max-width: 600px) {
    height: 2.9rem;
  }
`;

const Header = (): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledHeader isSticky={scrollPosition > 40}>
      <Banner>
        🎉 Backd is now live on Kovan Testnet. Connect your wallet to begin or read
        <BannerLink
          href="https://backdfund.medium.com/backd-testnet-guide-16540e09c46"
          target="_blank"
          rel="noopener noreferrer"
        >
          the blog post
        </BannerLink>
      </Banner>
      <Content>
        <Link to="/">
          <Logo src={logo} alt="Backd logo" />
        </Link>
        <NavItems />
        <Connector />
      </Content>
    </StyledHeader>
  );
};

export default Header;
