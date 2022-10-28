import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Header1, Header3 } from "../../styles/Headers";
import { GradientText } from "../../styles/GradientText";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { useNavigateToTop } from "../../app/hooks/use-navigate-to-top";
import useTvl from "../../app/hooks/use-tvl";

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
  font-weight: 600;
  letter-spacing: 0.17px;
  opacity: 0.8;

  font-size: 1.7rem;
  margin-bottom: 0.6rem;
  margin-top: 8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
    margin-top: 5rem;
  }
`;

const TvlValue = styled(GradientText)`
  font-weight: 700;

  font-size: 3.6rem;
  @media (max-width: 600px) {
    font-size: 3rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const LoaderContainer = styled.div`
  width: 15rem;
`;

const ButtonContainer = styled.div`
  margin-top: 8rem;
  @media (max-width: 600px) {
    margin-top: 5rem;
  }
`;

const Hero = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigateToTop();
  const tvl = useTvl();

  return (
    <StyledHero>
      <Header1>{t("landingPage.header")}</Header1>
      <Header3>{t("landingPage.subHeader")}</Header3>
      <TvlHeader>{t("landingPage.stats.tvl")}</TvlHeader>
      {tvl ? (
        <TvlValue id="hero-statistics-tvl">{tvl.toCompactUsdValue(1)}</TvlValue>
      ) : (
        <LoaderContainer>
          <Loader button />
        </LoaderContainer>
      )}
      <ButtonContainer>
        <Button primary large click={() => navigate("/pools")}>
          {t("landingPage.viewPools")}
        </Button>
      </ButtonContainer>
    </StyledHero>
  );
};

export default Hero;
