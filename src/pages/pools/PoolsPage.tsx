import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { useBackd } from "../../app/hooks/use-backd";
import ContentSection from "../../components/ContentSection";
import { fetchState, selectPools } from "../../state/poolsListSlice";
import { Pool } from "../../lib";
import Seo from "../../components/Seo";
import PoolsRow from "./PoolsRow";
import PoolsInformation from "./PoolsInformation";
import PoolsStatistics from "./PoolsStatistics";
import Overview from "../../components/Overview";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import LiveHelp from "../../components/LiveHelp";
import Loader from "../../components/Loader";
import { DOCS_LINK } from "../../lib/constants";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PoolsPageContent = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 1220px) {
    flex-direction: column-reverse;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.7rem;
  @media (max-width: 600px) {
    th:nth-child(1) {
      flex: 1.1;
    }
    th:nth-child(2) {
      flex: 0.9;
    }
  }
`;

interface HeaderProps {
  hideOnMobile?: boolean;
}

const Header = styled.div`
  flex: 1;
  text-align: left;
  font-weight: 700;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
  font-size: 1.4rem;
  @media (max-width: 600px) {
    display: ${(props: HeaderProps) => (props.hideOnMobile ? "none" : "flex")};
    font-size: 1.2rem;
  }
`;

const ChevronHeader = styled.div`
  width: 2.4rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
  width: 36rem;
  margin-left: 1.6rem;
  @media (max-width: 1220px) {
    margin-left: 0;
    width: 100%;
  }
`;

const PoolsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch();
  const pools = useSelector(selectPools);
  const updated = useWeb3Updated();

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  return (
    <StyledPoolsPage>
      <Seo title={t("metadata.pools.title")} description={t("metadata.pools.description")} />
      <PoolsPageContent>
        <ContentContainer>
          <ContentSection header={t("pools.header")} statistics={<PoolsStatistics />}>
            <HeaderRow>
              <Header>{t("headers.asset")}</Header>
              <Header>{t("headers.apy")}</Header>
              <Header>{t("headers.tvl")}</Header>
              <Header hideOnMobile>{t("headers.deposits")}</Header>
              <ChevronHeader />
            </HeaderRow>
            {!pools && (
              <>
                <Loader row />
                <Loader row />
                <Loader row />
              </>
            )}
            {pools && pools.map((pool: Pool) => <PoolsRow key={pool.address} pool={pool} />)}
          </ContentSection>
        </ContentContainer>
        <InfoCards>
          <Overview description={t("pools.overview")} link={DOCS_LINK} />
          <PoolsInformation />
          <LiveHelp />
        </InfoCards>
      </PoolsPageContent>
    </StyledPoolsPage>
  );
};

export default PoolsPage;
