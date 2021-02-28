import { useWeb3React } from "@web3-react/core";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { injectedConnector } from "../../app/web3";
import logo from "../../images/backd_logo.png";
import { Backd } from "../../lib/backd";
import { Address } from "../../lib/types";

function AppNav() {
  const {
    library: backd,
    activate,
    active,
    deactivate,
  } = useWeb3React<Backd>();
  const [account, setAccount] = useState<Address>("");

  const activateWallet = () => activate(injectedConnector);
  const deactivateWallet = () => deactivate();

  useEffect(() => {
    if (!backd) return;
    backd.currentAccount().then(setAccount);
  }, [backd]);

  return (
    <Nav className={classnames("ml-auto")}>
      {active ? (
        <>
          <NavLink className="nav-link" to="/" exact={true}>
            Pools
          </NavLink>
          <NavDropdown
            title={account.slice(0, 8) + "..."}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item href="#" onClick={deactivateWallet}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <NavLink to="#" className="nav-link" onClick={activateWallet}>
          Connect wallet
        </NavLink>
      )}
    </Nav>
  );
}

export function Header() {
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

      <AppNav />
    </Navbar>
  );
}
