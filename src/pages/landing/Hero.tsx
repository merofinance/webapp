import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import Button from "../../components/Button";
import { Header1, Header3 } from "../../styles/Headers";
import { useIsLive } from "../../app/hooks/use-is-live";

const StyledHero = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--section-margin);

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Hero = (): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();
  const { protocolLive, live } = useIsLive();
  const { chainId } = useWeb3React();

  return (
    <StyledHero>
      <Header1>{t("landingPage.header")}</Header1>
      <Header3>{t("landingPage.subHeader")}</Header3>
      <Button
        primary
        hero
        large
        inactive={!protocolLive && chainId !== 1}
        text={
          live
            ? protocolLive
              ? t("landingPage.viewPools")
              : chainId === 1
              ? t("landingPage.changeNetwork")
              : t("landingPage.unsupportedNetwork")
            : t("landingPage.comingSoon")
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
    </StyledHero>
  );
};

export default Hero;
