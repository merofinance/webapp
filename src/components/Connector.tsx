import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";

import WalletSelectPopup from "./WalletSelectPopup";
import { injectedConnector } from "../app/web3";
import { useBackd } from "../app/hooks/use-backd";
import ConnectorDesktop from "./ConnectorDesktop";
import ConnectorMobile from "./ConnectorMobile";

const Connector = (): JSX.Element => {
  const { account, active, activate, chainId } = useWeb3React();
  const backd = useBackd();
  const [connecting, setConnecting] = useState(false);

  const autoConnect = async () => {
    const authorized = await injectedConnector.isAuthorized();
    if (!active && authorized) {
      await activate(injectedConnector);
    }
  };

  useEffect(() => {
    autoConnect();
  }, [account, backd, chainId]);

  return (
    <>
      <ConnectorDesktop connect={() => setConnecting(true)} />
      <ConnectorMobile connect={() => setConnecting(true)} />
      <WalletSelectPopup show={connecting} close={() => setConnecting(false)} />
    </>
  );
};

export default Connector;
