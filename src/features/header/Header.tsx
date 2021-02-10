import classnames from "classnames";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../images/backd_logo.png";

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

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={classnames("ml-auto", "piped-nav-links")}>
          <Nav.Link href="https://github.com/backdfund">Litepaper</Nav.Link>
          <Nav.Link href="https://github.com/backdfund">Docs</Nav.Link>
          <Nav.Link href="https://github.com/backdfund">Code</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
