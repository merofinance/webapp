import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { BackdContext } from "./app/providers/backd";
import { Header } from "./features/header/Header";
import { Landing } from "./features/landing/Landing";
import { PoolsList } from "./features/pools-list/PoolsList";
import { Backd } from "./lib/backd";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";
import { Optional } from "./lib/types";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { PoolManagement } from "./features/pool-management/PoolManagement";
library.add(fab);

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
        <Switch>
          <Route path="/app/:poolName/deposit">
            <PoolManagement mode="deposit" />
          </Route>

          <Route path="/app/:poolName/withdraw">
            <PoolManagement mode="withdraw" />
          </Route>

          <Route path="/app/:poolName/positions">
            <PoolManagement mode="positions" />
          </Route>

          <Route path="/app">
            <PoolsList />
          </Route>

          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </BackdContext.Provider>
  );
}

export default App;
