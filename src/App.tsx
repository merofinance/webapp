import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { BackdContext } from "./app/providers/backd";
import { Header } from "./features/header/Header";
import { PoolManagement } from "./features/pool/PoolManagement";
import { PoolsList } from "./features/pools-list/PoolsList";
import { Backd } from "./lib/backd";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";
import { Optional } from "./lib/types";

library.add(faInfoCircle);

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
          <Route path="/:poolName/deposit">
            <PoolManagement mode="deposit" />
          </Route>

          <Route path="/:poolName/withdraw">
            <PoolManagement mode="withdraw" />
          </Route>

          <Route path="/:poolName/positions">
            <PoolManagement mode="positions" />
          </Route>

          <Route path="/">
            <PoolsList />
          </Route>
        </Switch>
      </Router>
    </BackdContext.Provider>
  );
}

export default App;
