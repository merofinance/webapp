import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../../images/backd_logo.png";

export function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
          src={logo}
          alt="backd logo"
          className="d-inline-block align-top"
          height="50"
        />
      </Navbar.Brand>
    </Navbar>
  );
}
