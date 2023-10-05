import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigateToTop } from "../app/hooks/use-navigate-to-top";
import { useWeb3Updated } from "../app/hooks/use-web3-updated";
import { AppDispatch } from "../app/store";
import { injectedConnector } from "../app/web3";
import { isConnecting, setConnecting } from "../state/userSlice";
import ConnectionDetails from "./ConnectionDetails";
import ConnectorDesktop from "./ConnectorDesktop";
import ConnectorMobile from "./ConnectorMobile";
import WalletSelectPopup from "./WalletSelectPopup";
import { PROTOCOL_PAGES } from "../lib/constants";

const Connector = (): JSX.Element => {
  const { active, activate } = useWeb3React();
  const updated = useWeb3Updated();
  const location = useLocation();
  const connecting = useSelector(isConnecting);
  const [showingDetails, setShowingDetails] = useState(false);
  const [wallet, setWallet] = useState("walletConnect.wallets.metaMask");
  const navigate = useNavigateToTop();
  const dispatch: AppDispatch = useDispatch();

  const inProtocolPage = PROTOCOL_PAGES.includes(location.pathname.split("/")[1]);

  const autoConnect = async () => {
    const authorized = await injectedConnector.isAuthorized();
    if (!active) {
      if (authorized) {
        await activate(injectedConnector);
      }
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
        close={(connected: boolean) => {
          setShowingDetails(false);
          dispatch(setConnecting(false));
          if (inProtocolPage && !connected) {
            navigate("/");
          }
        }}
        setWallet={(w: string) => setWallet(w)}
      />
    </>
  );
};

export default Connector;
