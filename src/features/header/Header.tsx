import { useWeb3React } from "@web3-react/core";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { injectedConnector } from "../../app/web3";
import logo from "../../images/backd_logo.png";
import { Backd } from "../../lib/backd";
import { Address } from "../../lib/types";
import { isConnected, logout, setConnected } from "../account/accountSlice";
import { TransactionsIndicator } from "../transactions-list/TransactionsIndicator";
import { transactionsCount } from "../transactions-list/transactionsSlice";

function AppNav() {
  const { library: backd, activate, active, deactivate } = useWeb3React<Backd>();
  const [account, setAccount] = useState<Address>("");
  const connected = useSelector(isConnected);
  const dispatch = useDispatch<AppDispatch>();

  const activateWallet = () => {
    activate(injectedConnector).then(() => {
      dispatch(setConnected(true));
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    deactivate();
  };

  const txCount = useSelector(transactionsCount);

  useEffect(() => {
    if (!backd) return;
    backd.currentAccount().then(setAccount);
  }, [backd]);

  return (
    <Nav className={classnames("ml-auto")}>
      {active && connected ? (
        <>
          <NavLink className="nav-link" to="/" exact={true}>
            Pools
          </NavLink>
          {txCount > 0 ? <TransactionsIndicator /> : null}
          <NavDropdown
            title={account.slice(0, 5) + "..." + account.slice(account.length - 5)}
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item href="#" onClick={handleLogout}>
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
          <img src={logo} alt="backd logo" className="d-inline-block align-top" height="50" />
        </Navbar.Brand>
      </LinkContainer>

      <AppNav />
    </Navbar>
  );
}
