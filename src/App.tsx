import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faClock,
  faExternalLinkAlt,
  faInfoCircle,
  faTimesCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import { useMock } from "./app/config";
import { PrivateRoute } from "./app/private-route";
import { AppDispatch } from "./app/store";
import Header from "./components/Header";
import { ConnectWallet } from "./features/account/ConnectWallet";
import { ErrorAlert } from "./features/error/ErrorAlert";
import { ErrorBoundary } from "./features/error/ErrorBoundary";
import { setError } from "./features/error/errorSlice";
import { PoolManagement } from "./features/pool/PoolManagement";
import { PoolsList } from "./features/pools-list/PoolsList";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";
import LandingPage from "./pages/landing/LandingPage";
import styled from "styled-components";

const StyledApp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 3rem 10rem;
  min-height: 100vh;
  background-color: var(--bg);
`;

library.add(faInfoCircle, faClock, faCheck, faTimesCircle, faExternalLinkAlt, faTrashAlt);

function App() {
  const dispatch: AppDispatch = useDispatch();

  const getLibrary = (rawProvider: any, connector: any) => {
    const provider = new ethers.providers.Web3Provider(rawProvider);
    const signer = useMock ? new MockSigner() : provider.getSigner();
    const options = { chainId: parseInt(rawProvider.chainId, 16) };
    try {
      return createBackd(signer, options);
    } catch (e) {
      dispatch(setError({ error: e.message }));
    }
  };

  return (
    <ErrorBoundary dispatch={dispatch}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <StyledApp>
          <Router>
            <Header />
            <ErrorAlert />
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

              <PrivateRoute path="/pools">
                <PoolsList />
              </PrivateRoute>

              <PrivateRoute path="/">
                <LandingPage />
              </PrivateRoute>
            </Switch>
          </Router>
        </StyledApp>
      </Web3ReactProvider>
    </ErrorBoundary>
  );
}

export default App;
