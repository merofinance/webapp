import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useWeb3Updated } from "../app/hooks/use-web3-updated";
import { injectedConnector } from "../app/web3";
import ConnectionDetails from "./ConnectionDetails";
import ConnectorDesktop from "./ConnectorDesktop";
import ConnectorMobile from "./ConnectorMobile";
import WalletSelectPopup from "./WalletSelectPopup";

const NO_CONNECTION_PAGES: string[] = ["/", "/litepaper"];

const Connector = (): JSX.Element => {
  const { active, activate } = useWeb3React();
  const updated = useWeb3Updated();
  const location = useLocation();
  const [connecting, setConnecting] = useState(false);
  const [showingDetails, setShowingDetails] = useState(false);
  const [wallet, setWallet] = useState("walletConnect.wallets.metaMask");

  const autoConnect = async () => {
    const authorized = await injectedConnector.isAuthorized();
    if (!active && authorized) {
      await activate(injectedConnector);
    }
  };

  const onClick = () => {
    if (active) setShowingDetails(true);
    else setConnecting(true);
  };

  useEffect(() => {
    autoConnect();
  }, [updated]);

  return (
    <>
      <ConnectorDesktop connect={onClick} />
      <ConnectorMobile connect={onClick} />
      <ConnectionDetails
        show={showingDetails}
        close={() => setShowingDetails(false)}
        changeWallet={() => setConnecting(true)}
        wallet={wallet}
      />
      <WalletSelectPopup
        show={connecting || (!active && !NO_CONNECTION_PAGES.includes(location.pathname))}
        close={() => {
          setConnecting(false);
          setShowingDetails(false);
        }}
        setWallet={(w: string) => setWallet(w)}
      />
    </>
  );
};

export default Connector;
