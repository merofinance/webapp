import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useWeb3Updated } from "../app/hooks/use-web3-updated";
import { injectedConnector } from "../app/web3";
import ConnectionDetails from "./ConnectionDetails";
import ConnectorDesktop from "./ConnectorDesktop";
import ConnectorMobile from "./ConnectorMobile";
import WalletSelectPopup from "./WalletSelectPopup";

const Connector = (): JSX.Element => {
  const { active, activate } = useWeb3React();
  const updated = useWeb3Updated();
  const [connecting, setConnecting] = useState(false);
  const [showingDetails, setShowingDetails] = useState(false);

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
      <WalletSelectPopup show={connecting} close={() => setConnecting(false)} />
      <ConnectionDetails show={showingDetails} close={() => setShowingDetails(false)} />
    </>
  );
};

export default Connector;
