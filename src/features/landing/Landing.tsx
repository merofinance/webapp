import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.scss";
import classnames from "classnames";
import { Button, Col, Form, Nav, Navbar, Row } from "react-bootstrap";
import aaveLogo from "../../images/aave.svg";
import curveLogo from "../../images/curvefi.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Landing() {
  return (
    <>
      <main className={styles.landing}>
        <section>
          <h1 className="mb-5">Interest earning liquidation protection</h1>
          <p>
            Liquidations are avoidable.
            <br />
            backd is a trustless and interest generating protocol <br />
            designed to prevent collateralized loans from becoming liquidable.
          </p>
          {/* <Row>
          <Col xs={{ span: 4, offset: 4 }}>
            <hr />
          </Col>
        </Row> */}
          <div className="enter-app text-center mt-5 mb-3">
            <Link to="/app" className="btn btn-primary btn-lg">
              Enter app
            </Link>
          </div>
        </section>

        <hr />

        <section>
          <h1>Supported by</h1>
          <p className="mb-4">backd is currently supported by</p>
          <Row noGutters className={classnames("text-center", styles.logos)}>
            <Col xs={6} md={{ span: 4, offset: 2 }}>
              <img src={aaveLogo} alt="aave logo" />
            </Col>
            <Col xs={6} md={{ span: 4 }}>
              <img src={curveLogo} alt="Curve logo" />
            </Col>
          </Row>
        </section>

        <hr />

        <section>
          <h1>Stay updated</h1>
          <p>
            Enter your email to receive updates about the latest backd updates
          </p>
          <Row noGutters className="text-center">
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 4, offset: 4 }}>
              <Form>
                <Form.Row className="align-items-center">
                  <Col xs={8} md={9} className="my-1">
                    <Form.Label htmlFor="updates-email" srOnly>
                      Name
                    </Form.Label>
                    <Form.Control
                      id="updates-email"
                      placeholder="email@example.com"
                    />
                  </Col>

                  <Col xs="auto" className="my-1">
                    <Button type="submit">Submit</Button>
                  </Col>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </section>

        <hr className="mb-0" />
      </main>

      <Navbar className={styles.footer} bg="light" expand={true}>
        <Nav className={classnames("mr-auto", "piped-nav-links")}>
          <Nav.Link href="https://github.com/backdfund">Litepaper</Nav.Link>
          <Nav.Link href="https://github.com/backdfund">Docs</Nav.Link>
          <Nav.Link href="https://github.com/backdfund">Code</Nav.Link>
        </Nav>
        <Nav className={classnames("ml-auto")}>
          <Nav.Link href="https://twitter.com/backdfund">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
