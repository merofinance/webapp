import classnames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink, useRouteMatch } from "react-router-dom";
import { BackdContext } from "../../app/providers/backd";
import logo from "../../images/backd_logo.png";
import { Address } from "../../lib/types";

function AppNav() {
  const backd = useContext(BackdContext);
  const [account, setAccount] = useState<Address>("");

  useEffect(() => {
    if (!backd) return;
    backd.currentAccount().then(setAccount);
  }, [backd]);

  return (
    <Nav className={classnames("ml-auto")}>
      <NavLink className="nav-link" to="/app">
        Pools
      </NavLink>

      <NavDropdown
        title={account.slice(0, 8) + "..."}
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item href="#">Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

function LandingNav() {
  return (
    <Nav className={classnames("ml-auto")}>
      <NavLink className="btn btn-primary" to="/app" exact={true}>
        Enter app
      </NavLink>
    </Nav>
  );
}

export function Header() {
  const inApp = useRouteMatch("/app") !== null;
  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>
          <img
            src={logo}
            alt="backd logo"
            className="d-inline-block align-top"
            height="50"
          />
        </Navbar.Brand>
      </LinkContainer>

      {inApp ? <AppNav /> : <LandingNav />}
    </Navbar>
  );
}
