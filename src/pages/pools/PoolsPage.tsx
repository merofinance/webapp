import React, { useEffect } from "react";
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

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1439px) {
    flex-direction: column-reverse;
  }
`;

const Table = styled.table`
  width: 100%;
`;

const HeaderRow = styled.tr`
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

const Header = styled.th`
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

const ChevronHeader = styled.th`
  width: 2.4rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
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
      <Seo
        title="Backd Pools"
        description="Increase leverage, farm yield, & prevent DeFi loans (Aave, Compound, etc.) from liquidation"
      />
      <ContentSection
        header={t("pools.header")}
        statistics={<PoolsStatistics />}
        content={
          <Table>
            <thead>
              <HeaderRow>
                <Header>{t("headers.asset")}</Header>
                <Header>{t("headers.apy")}</Header>
                <Header>{t("headers.tvl")}</Header>
                <Header hideOnMobile>{t("headers.deposits")}</Header>
                <ChevronHeader />
              </HeaderRow>
            </thead>
            {pools.map((pool: Pool) => (
              <PoolsRow key={pool.address} pool={pool} />
            ))}
          </Table>
        }
      />
      <InfoCards>
        <Overview
          description="Backd’s single-asset pools aggregate yield across strategies. After depositing an asset, register a top-up position to protect from liquidation on supported collateralized lending protocols."
          link="https://docs.backd.fund/"
        />
        <PoolsInformation />
      </InfoCards>
    </StyledPoolsPage>
  );
};

export default PoolsPage;
