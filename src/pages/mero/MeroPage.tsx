import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Seo from "../../components/Seo";
import MeroSummary from "./MeroSummary";
import Overview from "../../components/Overview";
import BoostChart from "./BoostChart";
import StakeMero from "./StakeMero";
import BasicCard from "../../components/BasicCard";
import { DOCS_PLATFORM_FEES_LINK } from "../../lib/links";

const StyledMeroPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1220px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;

  @media (max-width: 1220px) {
    flex: auto;
  }
`;

const StatContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.6rem;

  @media (max-width: 1220px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2.4rem;
  }
`;

const InfoCards = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  margin-right: 1.6rem;

  @media (max-width: 1220px) {
    margin-right: 0;
    flex: auto;
    margin-bottom: 2.4rem;
  }
`;

const MeroPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledMeroPage>
      <Seo title={t("metadata.mero.title")} description={t("metadata.mero.description")} />
      <MeroSummary />
      <Container>
        <InfoCards>
          <Overview defaultClosed description={t("mero.overview")} link={DOCS_PLATFORM_FEES_LINK} />
          <div>
            <StakeMero />
          </div>
        </InfoCards>
        <Content>
          <BoostChart />
          <StatContainer>
            <BasicCard
              label={t("mero.statistics.stkmero.header")}
              value="312.34 stkMERO"
              subValue="= 1000 MERO"
            />
            <BasicCard
              label={t("mero.statistics.boost.header")}
              value="2.6x"
              subValue={t("mero.statistics.boost.subHeader")}
            />
          </StatContainer>
        </Content>
      </Container>
    </StyledMeroPage>
  );
};

export default MeroPage;
