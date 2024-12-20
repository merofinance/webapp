import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { shortenAddress } from "../lib/text";
import { chainIds } from "../lib/constants";
import PulsingDot from "./PulsingDot";
import pending from "../assets/ui/status/pending.svg";
import { spinAnimation } from "../styles/animations/SpinAnimation";
import { pendingTransactionsCount } from "../state/transactionsSlice";
import useWindowPosition from "../app/hooks/use-window-position";
import useENS from "../app/hooks/use-ens";

interface ConnectorProps {
  connected: boolean;
}

const StyledConnectorDesktop = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 715px) {
    display: none;
  }

  @media only percy {
    opacity: ${(props: ConnectorProps) => (props.connected ? 0 : 1)};
  }
`;

const Network = styled.div`
  display: flex;
  align-items: center;
  height: 3.2rem;
  border-radius: 1.6rem;
  padding: 0 2rem;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  line-height: 2.8rem;
  font-weight: 500;
  background-color: rgba(137, 102, 246, 0.1);
  margin-right: 1.6rem;
`;

interface ButtonProps {
  connected: boolean;
  lightBackground: boolean;
}

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  height: ${(props: ButtonProps) => (props.connected ? "4.2rem" : "5.4rem")};
  width: ${(props: ButtonProps) => (props.connected ? "fit-content" : "17.2rem")};
  border-radius: ${(props: ButtonProps) => (props.connected ? "8px" : "2.7rem")};

  transition: background-color 0.3s, background-position 0.5s;
  border: ${(props: ButtonProps) => (props.connected ? "1px" : "6px")} solid transparent;
  background: linear-gradient(
      ${(props: ButtonProps) =>
        props.connected ? (props.lightBackground ? "#120e2c" : "#0A0524") : "var(--main)"},
      ${(props: ButtonProps) =>
        props.connected ? (props.lightBackground ? "#120e2c" : "#0A0524") : "var(--main)"}
    ),
    ${(props: ButtonProps) =>
      props.connected
        ? "linear-gradient(to right, var(--primary-gradient) 0%, var(--secondary-gradient) 50%, var(--primary-gradient) 100%)"
        : "linear-gradient(to right, rgba(197, 50, 249, 0.7) 0%, rgba(50, 178, 229, 0.7) 50%, rgba(197, 50, 249, 0.7) 100%)"};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-size: 200% auto;

  :hover {
    background-position: right center;

    div {
      background-position: right center;
    }
  }
`;

const ConnectorText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.5rem;
  letter-spacing: 0.46px;
  background: linear-gradient(
    to right,
    var(--primary-gradient) 0%,
    var(--secondary-gradient) 50%,
    var(--primary-gradient) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 0.5s;
  background-size: 200% auto;
`;

const IndicatorContainer = styled.div`
  margin: 0 0.7rem;
`;

const ENSAvatar = styled.img`
  margin-right: 8px;
  height: 25px;
  width: 25px;
  border-radius: 100px;
  background: var(--sub);
`;

interface LoadingProps {
  pending: boolean;
}

const Loading = styled.img`
  width: 1.2rem;
  animation: ${spinAnimation} 1s linear infinite;
  opacity: ${(props: LoadingProps) => (props.pending ? 1 : 0)};
`;

interface Props {
  connect: () => void;
}

const ConnectorDesktop = ({ connect }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { account, active, chainId } = useWeb3React();
  const windowPosition = useWindowPosition();
  const loading = useSelector(pendingTransactionsCount) > 0;
  const { ensName, ensAvatar } = useENS();

  return (
    <StyledConnectorDesktop connected={active}>
      {chainId && chainId !== 1 && chainIds[chainId] && (
        <Network id="network-name">{chainIds[chainId]}</Network>
      )}
      <Button
        id="desktop-connector"
        onClick={() => connect()}
        connected={active}
        lightBackground={windowPosition > 40}
      >
        {active && (
          <IndicatorContainer>
            <PulsingDot success={chainId === 1} />
          </IndicatorContainer>
        )}
        <ConnectorText id="connector-address">
          {ensAvatar && <ENSAvatar src={ensAvatar} />}
          {account ? ensName || shortenAddress(account, 8) : t("walletConnect.connectWallet")}
        </ConnectorText>
        {active && (
          <IndicatorContainer>
            <Loading id="connector-loading-indicator" pending={loading} src={pending} />
          </IndicatorContainer>
        )}
      </Button>
    </StyledConnectorDesktop>
  );
};

export default ConnectorDesktop;
