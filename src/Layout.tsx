import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import Web3 from "web3";

import { setError } from "./state/errorSlice";
import { useMock } from "./app/config";
import { AppDispatch } from "./app/store";
import Header from "./components/Header";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";
import Footer from "./components/Footer";
import ErrorAlert from "./components/ErrorAlert";
import { BackdError } from "./app/errors";

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

const Layout = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  const getLibrary = (rawProvider: any, connector: any) => {
    // Custom handling for when running Cypress tests
    if ((window as any).testing) {
      const web3 = new Web3((window as any).web3.currentProvider);
      (window as any).ethereum = web3.eth;
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum.currentProvider,
        "any"
      );
      return createBackd(provider.getSigner(), { chainId: 42 });
    }

    // Standard handling for users
    const provider = new ethers.providers.Web3Provider(rawProvider);
    const signer = useMock ? new MockSigner() : provider.getSigner();
    const options = { chainId: parseInt(rawProvider.chainId, 16) };
    try {
      return createBackd(signer, options);
    } catch (e: any) {
      const error = e instanceof BackdError ? e.toErrorState() : { message: e.message };
      dispatch(setError(error));
    }
  };

  return (
    <HelmetProvider>
      <ErrorBoundary dispatch={dispatch}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Background>
            <Header />
            <StyledApp>
              <Content>
                <Outlet />
              </Content>
              <Footer />
              <ErrorAlert />
            </StyledApp>
          </Background>
        </Web3ReactProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default Layout;
