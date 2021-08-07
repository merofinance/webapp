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
import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { useMock } from "./app/config";
import { PrivateRoute } from "./app/private-route";
import { AppDispatch } from "./app/store";
import Header from "./components/Header";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { setError } from "./state/errorSlice";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";
import LandingPage from "./pages/landing/LandingPage";
import Footer from "./components/Footer";
import PoolsPage from "./pages/pools/PoolsPage";
import StakePage from "./pages/stake/StakePage";
import LitepaperPage from "./pages/litepaper/LitepaperPage";
import { ConnectWallet } from "./components/ConnectWallet";
import ClaimPage from "./pages/claim/ClaimPage";
import PoolPage from "./pages/pool/PoolPage";
import { LIVE, STAKING_LIVE } from "./lib/constants";
import { ErrorAlert } from "./components/ErrorAlert";

const Background = styled.div`
  background: radial-gradient(rgba(11, 3, 60, 0.2), rgba(10, 5, 38, 0.3));
`;

const StyledApp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 10rem;
  padding-bottom: 3rem;
  min-height: calc(100vh - 18.2rem);
  overflow: hidden;

  @media (max-width: 600px) {
    padding: 0 1.6rem;
    padding-bottom: 3.3rem;
  }

  @media (min-width: 601px) and (max-width: 1224px) {
    padding: 0 4rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1400px;
`;

library.add(faInfoCircle, faClock, faCheck, faTimesCircle, faExternalLinkAlt, faTrashAlt);

const App = (): JSX.Element => {
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
    <Suspense fallback={<div />}>
      <ErrorBoundary dispatch={dispatch}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Router>
            <Background>
              <Header />
              <StyledApp>
                <Content>
                  <Switch>
                    {LIVE && (
                      <PrivateRoute path="/pool/:poolName">
                        <PoolPage />
                      </PrivateRoute>
                    )}

                    {LIVE && (
                      <Route path="/connect">
                        <ConnectWallet />
                      </Route>
                    )}

                    {LIVE && (
                      <PrivateRoute path="/pools">
                        <PoolsPage />
                      </PrivateRoute>
                    )}

                    {STAKING_LIVE && (
                      <Route path="/claim">
                        <ClaimPage />
                      </Route>
                    )}

                    {STAKING_LIVE && (
                      <Route path="/stake">
                        <StakePage />
                      </Route>
                    )}

                    <Route path="/litepaper">
                      <LitepaperPage />
                    </Route>

                    <Route path="/">
                      <LandingPage />
                    </Route>
                  </Switch>
                </Content>
                <Footer />
                <ErrorAlert />
              </StyledApp>
            </Background>
          </Router>
        </Web3ReactProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
