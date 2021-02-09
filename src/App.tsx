import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { BackdContext } from "./app/providers/backd";
import { Header } from "./features/header/Header";
import { Landing } from "./features/landing/Landing";
import { Pools } from "./features/pools/Pools";
import { Backd } from "./lib/backd";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";
import { Optional } from "./lib/types";

function App() {
  const [backd, setBackd] = useState<Optional<Backd>>(null);

  useEffect(() => {
    if (backd) return;
    createBackd(new MockSigner()).then((backdInstance) => {
      setBackd(backdInstance);
    });
  });

  return (
    <BackdContext.Provider value={backd}>
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route path="/app">
              <Pools />
            </Route>

            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Container>
      </Router>
    </BackdContext.Provider>
  );
}

export default App;
