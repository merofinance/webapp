import { useWeb3React } from "@web3-react/core";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";

import { shortenAddress } from "../lib/text";
import { GradientText } from "../styles/GradientText";
import Button from "./Button";

import Popup from "./Popup";
import { chainIds } from "../lib/constants";
import PulsingDot from "./PulsingDot";
import RecentTransactions from "./RecentTransactions";
import { getEtherscanAddressLink } from "../lib/web3";

const WalletContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wallet = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.15px;
  opacity: 0.5;
`;

const AddressContainer = styled.a`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 3.2rem;
  background-color: rgba(10, 6, 33, 0.4);
  border-radius: 0.7rem;
  margin-top: 1.2rem;
  cursor: pointer;
`;

const Address = styled(GradientText)`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2.8rem;
  letter-spacing: 0.15px;

  @media only percy {
    opacity: 0;
  }
`;

const NetworkContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
  height: 3.2rem;
  display: flex;
  align-items: center;
  background-color: rgba(137, 102, 246, 0.1);
  border-radius: 1.6rem;
  margin-top: 2.4rem;
`;

const Network = styled.div`
  font-size: 1.4rem;
  line-height: 2.8rem;
  font-weight: 500;
  letter-spacing: 0.15px;
  margin-left: 0.7rem;
`;

interface Props {
  show: boolean;
  close: () => void;
  changeWallet: () => void;
  wallet: string;
}

const ConnectionDetails = ({ show, close, changeWallet, wallet }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { account, chainId } = useWeb3React();

  const networkName = (): string => {
    if (!chainId) return t("walletConnect.details.network.unknown");
    if (chainId === 1) return t("walletConnect.details.network.ethereum");
    const network = chainIds[chainId.toString()];
    if (!network) return t("walletConnect.details.network.chainId", { id: chainId });
    return t("walletConnect.details.network.testnet", { network });
  };

  return (
    <Popup
      id="connection-details"
      small
      show={show}
      close={close}
      header={t("walletConnect.details.header")}
    >
      <WalletContainer>
        <Wallet id="account-details-wallet">
          {t("walletConnect.details.connected", { wallet: t(wallet) })}
        </Wallet>
        <Button tiny background="var(--bg-light)" click={changeWallet}>
          {t("walletConnect.details.change")}
        </Button>
      </WalletContainer>
      <AddressContainer
        href={getEtherscanAddressLink(chainId, account || "")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Address id="account-details-address">{shortenAddress(account || "", 24)}</Address>
        <LaunchIcon
          fontSize="medium"
          style={{ fill: "var(--secondary)", transform: "translateY(0px)" }}
        />
      </AddressContainer>
      <NetworkContainer>
        <PulsingDot success={chainId === 1} />
        <Network id="account-details-network">{networkName()}</Network>
      </NetworkContainer>
      <RecentTransactions />
    </Popup>
  );
};

export default ConnectionDetails;
