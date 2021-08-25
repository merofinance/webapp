import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../assets/logo/logo.svg";
import Connector from "./Connector";
import NavItems from "./NavItems";
import Banner from "./Banner";

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
      <Banner />
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
