import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Seo from "../../components/Seo";
import BkdSummary from "./BkdSummary";
import Overview from "../../components/Overview";
import StkBkdChart from "./StkBkdChart";

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
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
`;

const BkdPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledBkdPage>
      <Seo title={t("metadata.bkd.title")} description={t("metadata.bkd.description")} />
      <BkdSummary />
      <Container>
        <Content>
          <StkBkdChart />
        </Content>
        <InfoCards>
          <Overview
            description={t("bkd.overview")}
            link="https://docs.backd.fund/protocol-architecture/tokenomics/token-income"
          />
        </InfoCards>
      </Container>
    </StyledBkdPage>
  );
};

export default BkdPage;
