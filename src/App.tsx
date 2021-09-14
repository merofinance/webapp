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
import { HelmetProvider } from "react-helmet-async";

import { setError } from "./state/errorSlice";
import { useMock } from "./app/config";
import { AppDispatch } from "./app/store";
import Header from "./components/Header";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";
import LandingPage from "./pages/landing/LandingPage";
import Footer from "./components/Footer";
import PoolsPage from "./pages/pools/PoolsPage";
import StakePage from "./pages/stake/StakePage";
import LitepaperPage from "./pages/litepaper/LitepaperPage";
import ClaimPage from "./pages/claim/ClaimPage";
import PoolPage from "./pages/pool/PoolPage";
import { ErrorAlert } from "./components/ErrorAlert";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import { BackdError } from "./app/errors";
import { useIsLive } from "./app/hooks/use-is-live";

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
  flex: 1;
`;

library.add(faInfoCircle, faClock, faCheck, faTimesCircle, faExternalLinkAlt, faTrashAlt);

const App = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const { stakingLive } = useIsLive();

  const getLibrary = (rawProvider: any, connector: any) => {
    const provider = new ethers.providers.Web3Provider(rawProvider);
    const signer = useMock ? new MockSigner() : provider.getSigner();
    const options = { chainId: parseInt(rawProvider.chainId, 16) };

    try {
      return createBackd(signer, options);
    } catch (e) {
      const error = e instanceof BackdError ? e.toErrorState() : { message: e.message };
      dispatch(setError(error));
    }
  };

  return (
    <Suspense fallback={<div />}>
      <HelmetProvider>
        <ErrorBoundary dispatch={dispatch}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Router>
              <Background>
                <Header />
                <StyledApp>
                  <Content>
                    <Switch>
                      <Route path="/pool/:poolName">
                        <PoolPage />
                      </Route>

                      <Route path="/pools">
                        <PoolsPage />
                      </Route>

                      {stakingLive && (
                        <Route path="/claim">
                          <ClaimPage />
                        </Route>
                      )}

                      {stakingLive && (
                        <Route path="/stake">
                          <StakePage />
                        </Route>
                      )}

                      <Route path="/litepaper">
                        <LitepaperPage />
                      </Route>

                      <Route exact path="/">
                        <LandingPage />
                      </Route>

                      <Route>
                        <NotFoundPage />
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
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
