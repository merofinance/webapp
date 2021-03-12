import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { useMock } from "./app/config";
import { PrivateRoute } from "./app/private-route";
import { ConnectWallet } from "./features/connect-wallet/ConnectWallet";
import { Header } from "./features/header/Header";
import { PoolManagement } from "./features/pool/PoolManagement";
import { PoolsList } from "./features/pools-list/PoolsList";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";

library.add(faInfoCircle);

function getLibrary(rawProvider: any, connector: any) {
  const provider = new ethers.providers.Web3Provider(rawProvider);
  const signer = useMock ? new MockSigner() : provider.getSigner();
  const options = { chainId: parseInt(rawProvider.chainId, 16) };
  return createBackd(signer, options);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <Header />
        <Switch>
          <PrivateRoute path="/:poolName/deposit">
            <PoolManagement mode="deposit" />
          </PrivateRoute>

          <PrivateRoute path="/:poolName/withdraw">
            <PoolManagement mode="withdraw" />
          </PrivateRoute>

          <PrivateRoute path="/:poolName/positions">
            <PoolManagement mode="positions" />
          </PrivateRoute>

          <Route path="/connect">
            <ConnectWallet />
          </Route>

          <PrivateRoute path="/">
            <PoolsList />
          </PrivateRoute>
        </Switch>
      </Router>
    </Web3ReactProvider>
  );
}

export default App;
