import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Header1, Header3 } from "../../styles/Headers";
import CallToActionButton from "./CallToActionButton";

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
  const { t } = useTranslation();

  return (
    <StyledHero>
      <Header1>{t("landingPage.header")}</Header1>
      <Header3>{t("landingPage.subHeader")}</Header3>
      <CallToActionButton hero />
    </StyledHero>
  );
};

export default Hero;
