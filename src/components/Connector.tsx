import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";

import WalletSelectPopup from "./WalletSelectPopup";
import { injectedConnector } from "../app/web3";
import ConnectorDesktop from "./ConnectorDesktop";
import ConnectorMobile from "./ConnectorMobile";
import { useWeb3Updated } from "../app/hooks/use-web3-updated";

const Connector = (): JSX.Element => {
  const { active, activate } = useWeb3React();
  const updated = useWeb3Updated();
  const [connecting, setConnecting] = useState(false);

  const autoConnect = async () => {
    const authorized = await injectedConnector.isAuthorized();
    if (!active && authorized) {
      await activate(injectedConnector);
    }
  };

  useEffect(() => {
    autoConnect();
  }, [updated]);

  return (
    <>
      <ConnectorDesktop connect={() => setConnecting(true)} />
      <ConnectorMobile connect={() => setConnecting(true)} />
      <WalletSelectPopup show={connecting} close={() => setConnecting(false)} />
    </>
  );
};

export default Connector;
