import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Seo from "../../components/Seo";
import Hero from "./Hero";

const StyledLanding = styled.div`
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LandingPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledLanding>
      <Seo title={t("metadata.landing.title")} description={t("metadata.landing.description")} />
      <Content>
        <Hero />
      </Content>
    </StyledLanding>
  );
};

export default LandingPage;
