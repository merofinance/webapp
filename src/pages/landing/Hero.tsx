import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Button from "../../components/Button";
import { Header1, Header3 } from "../../styles/Headers";
import { LIVE } from "../../lib/constants";

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
  // const { t } = useTransl;
  const { t } = useTranslation();

  return (
    <StyledHero>
      <Header1>{t("landingPage.header")}</Header1>
      <Header3>{t("landingPage.subHeader")}</Header3>
      <Button
        primary
        hero
        large
        inactive={!LIVE}
        text={LIVE ? t("landingPage.viewPools") : t("landingPage.comingSoon")}
        click={() => {
          if (!LIVE) return;
          history.push("/pools");
        }}
      />
    </StyledHero>
  );
};

export default Hero;
