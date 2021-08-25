import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useWeb3Updated } from "../app/hooks/use-web3-updated";
import { AppDispatch } from "../app/store";
import { injectedConnector } from "../app/web3";
import { isConnecting, setConnecting } from "../state/userSlice";
import ConnectionDetails from "./ConnectionDetails";
import ConnectorDesktop from "./ConnectorDesktop";
import ConnectorMobile from "./ConnectorMobile";
import WalletSelectPopup from "./WalletSelectPopup";

const PROTOCOL_PAGES = ["pools", "pool"];

const Connector = (): JSX.Element => {
  const { active, activate } = useWeb3React();
  const updated = useWeb3Updated();
  const location = useLocation();
  const connecting = useSelector(isConnecting);
  const [showingDetails, setShowingDetails] = useState(false);
  const [wallet, setWallet] = useState("walletConnect.wallets.metaMask");
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();

  const inProtocolPage = PROTOCOL_PAGES.includes(location.pathname.split("/")[1]);

  const autoConnect = async () => {
    const authorized = await injectedConnector.isAuthorized();
    if (!active && authorized) {
      await activate(injectedConnector);
    }
  };

  const onClick = () => {
    if (active) setShowingDetails(true);
    else dispatch(setConnecting(true));
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
        changeWallet={() => dispatch(setConnecting(true))}
        wallet={wallet}
      />
      <WalletSelectPopup
        show={connecting || (!active && inProtocolPage)}
        close={() => {
          setShowingDetails(false);
          dispatch(setConnecting(false));
          if (inProtocolPage) {
            history.replace("/");
          }
        }}
        setWallet={(w: string) => setWallet(w)}
      />
    </>
  );
};

export default Connector;
