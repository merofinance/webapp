import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { LIVE } from "../lib/constants";
import Connector from "./Connector";
import NavItems from "./NavItems";

type HeaderProps = {
  isSticky: boolean;
};

const StyledHeader = styled.div`
  position: relative;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8rem;
  z-index: 1;
  transition: all 0.3s;
  padding: 2.4rem 12.4rem;

  background-color: ${(props: HeaderProps) => (props.isSticky ? "#120e2c" : "transparent")};
  box-shadow: -4px 0px 4px rgba(0, 0, 0, ${(props: HeaderProps) => (props.isSticky ? "0.25" : "0")});

  @media (max-width: 600px) {
    padding: 2.3rem 1.6rem;
    margin-bottom: 0;
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

const Header = () => {
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
      <a href="/">
        <Logo src={logo} alt="Backd logo" />
      </a>
      <NavItems />
      {LIVE && <Connector />}
    </StyledHeader>
  );
};

export default Header;
