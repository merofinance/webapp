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
import { useMock } from "./app/config";
import { PrivateRoute } from "./app/private-route";
import { AppDispatch } from "./app/store";
import Header from "./components/Header";
import { ConnectWallet } from "./features/account/ConnectWallet";
import { ErrorAlert } from "./features/error/ErrorAlert";
import { ErrorBoundary } from "./features/error/ErrorBoundary";
import { setError } from "./features/error/errorSlice";
import { PoolManagement } from "./features/pool/PoolManagement";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";
import LandingPage from "./pages/landing/LandingPage";
import styled from "styled-components";
import Footer from "./components/Footer";
import PoolsPage from "./pages/pools/PoolsPage";
import LitepaperPage from "./pages/litepaper/LitepaperPage";

const StyledApp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 10rem;
  padding-bottom: 3rem;
  min-height: calc(100vh - 18.2rem);
  overflow: hidden;

  @media (max-width: 600px) {
    padding: 0 3.3rem;
    padding-bottom: 3.3rem;
  }
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
        <Router>
          <Header />
          <StyledApp>
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
                <PoolsPage />
              </PrivateRoute>

              <PrivateRoute path="/litepaper">
                <LitepaperPage />
              </PrivateRoute>

              <PrivateRoute path="/">
                <LandingPage />
              </PrivateRoute>
            </Switch>
            <Footer />
          </StyledApp>
        </Router>
      </Web3ReactProvider>
    </ErrorBoundary>
  );
}

export default App;
