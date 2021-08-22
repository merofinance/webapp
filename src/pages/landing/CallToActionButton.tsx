import React from "react";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import Button from "../../components/Button";
import { useIsLive } from "../../app/hooks/use-is-live";

interface Props {
  hero?: boolean;
}

const CallToActionButton = ({ hero }: Props): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { protocolLive } = useIsLive();
  const { chainId } = useWeb3React();

  return (
    <Button
      primary
      hero={hero}
      large
      inactive={!protocolLive && chainId !== 1}
      text={
        protocolLive
          ? t("landingPage.viewPools")
          : chainId === 1
          ? t("landingPage.changeNetwork")
          : t("landingPage.unsupportedNetwork")
      }
      click={() => {
        if (!protocolLive) {
          if (chainId !== 1) return;
          return (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x2a" }],
          });
        }
        history.push("/pools");
      }}
    />
  );
};

export default CallToActionButton;
