import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../assets/logo/logo.svg";
import Connector from "./Connector";
import NavItems from "./NavItems";
import useWindowPosition from "../app/hooks/use-window-position";

interface HeaderProps {
  isSticky: boolean;
}

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  transition: all 0.3s;

  background-color: ${(props: HeaderProps) => (props.isSticky ? "#120e2c" : "transparent")};
  box-shadow: -4px 0px 4px rgba(0, 0, 0, ${(props: HeaderProps) => (props.isSticky ? "0.25" : "0")});

  margin-bottom: 8rem;
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
  const windowPosition = useWindowPosition();

  return (
    <StyledHeader isSticky={windowPosition > 40}>
      <Content>
        <Link to="/">
          <Logo src={logo} alt="Mero logo" />
        </Link>
        <NavItems />
        <Connector />
      </Content>
    </StyledHeader>
  );
};

export default Header;
