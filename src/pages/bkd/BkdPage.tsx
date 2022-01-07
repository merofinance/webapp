import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Seo from "../../components/Seo";
import BkdSummary from "./BkdSummary";
import Overview from "../../components/Overview";
import MultiplierChart from "./MultiplierChart";

const StyledBkdPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Content = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
`;

const InfoCards = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  margin-right: 1.6rem;

  @media (max-width: 1220px) {
    margin-right: 0;
  }
`;

const BkdPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledBkdPage>
      <Seo title={t("metadata.bkd.title")} description={t("metadata.bkd.description")} />
      <BkdSummary />
      <Container>
        <InfoCards>
          <Overview
            description={t("bkd.overview")}
            link="https://docs.backd.fund/protocol-architecture/tokenomics/token-income"
          />
        </InfoCards>
        <Content>
          <MultiplierChart />
        </Content>
      </Container>
    </StyledBkdPage>
  );
};

export default BkdPage;
