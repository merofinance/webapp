import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Header1, Header3 } from "../../styles/Headers";
import CallToActionButton from "./CallToActionButton";
import { GradientText } from "../../styles/GradientText";
import { selectTotalDeposits } from "../../state/selectors";
import Loader from "../../components/Loader";

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

const TvlHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  letter-spacing: 0.17px;
  opacity: 0.8;
  margin-bottom: 0.6rem;
  margin-top: 8rem;
`;

const TvlValue = styled(GradientText)`
  font-size: 3.6rem;
  font-weight: 700;
`;

const LoaderContainer = styled.div`
  width: 15rem;
`;

const Hero = (): JSX.Element => {
  const { t } = useTranslation();
  const totalDeposits = useSelector(selectTotalDeposits());

  return (
    <StyledHero>
      <Header1>{t("landingPage.header")}</Header1>
      <Header3>{t("landingPage.subHeader")}</Header3>
      <TvlHeader>{t("landingPage.stats.tvl")}</TvlHeader>
      {totalDeposits ? (
        <TvlValue>{totalDeposits.toCompactUsdValue(1)}</TvlValue>
      ) : (
        <LoaderContainer>
          <Loader button />
        </LoaderContainer>
      )}
      <CallToActionButton hero />
    </StyledHero>
  );
};

export default Hero;
