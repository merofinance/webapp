import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Header2 } from "../../styles/Headers";
import Button from "../../components/Button";
import { useNavigateToTop } from "../../app/hooks/use-navigate-to-top";

const StyledGetStarted = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.6rem;
  width: 111rem;
  border-radius: 1.4rem;
  background: linear-gradient(
    to right,
    rgba(34, 31, 55, 0.1) 0%,
    #221f37 50%,
    rgba(34, 31, 55, 0.1) 100%
  );

  button {
    transform: translateY(6.7rem);
  }

  @media (max-width: 600px) {
    width: 100%;

    button {
      transform: translateY(5.7rem);
    }
  }
`;

const Body = styled.p`
  max-width: 60.7rem;
  font-size: 4.8rem;
  font-weight: 700;
  line-height: 5.6rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 3.2rem;
    line-height: 3.7rem;
  }
`;

const GetStarted = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigateToTop();

  return (
    <StyledGetStarted>
      <Container>
        <Header2>{t("getStarted.header")}</Header2>
        <Body>{t("getStarted.description")}</Body>
        <Button primary large click={() => navigate("/pools")}>
          {t("landingPage.viewPools")}
        </Button>
      </Container>
    </StyledGetStarted>
  );
};

export default GetStarted;
