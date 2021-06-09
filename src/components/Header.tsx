import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 4.8rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo src={logo} />
    </StyledHeader>
  );
};

export default Header;
