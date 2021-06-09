import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import Connector from "./Connector";
import NavItems from "./NavItems";

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8rem;
  z-index: 1;
`;

const Logo = styled.img`
  height: 4.8rem;
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
`;

const Header = () => {
  const history = useHistory();

  return (
    <StyledHeader>
      <Logo onClick={() => history.push("/")} src={logo} />
      <Actions>
        <NavItems />
        <Connector />
      </Actions>
    </StyledHeader>
  );
};

export default Header;
