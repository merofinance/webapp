import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Seo from "../../components/Seo";
import ClaimSummary from "./ClaimSummary";
import ClaimAccordion from "./ClaimAccordion";

import poolsIcon from "../../assets/sections/pools.svg";
import { selectLpGaugeEarned, selectTotalLpGaugeEarned } from "../../state/userSlice";
import { selectPools } from "../../state/poolsListSlice";
import { Pool } from "../../lib";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Headers = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1.6rem;
  margin-bottom: 0.5rem;
`;

interface HeaderProps {
  hideMobile?: boolean;
}

const Header = styled.div`
  flex: 1;
  font-weight: 700;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  color: rgba(255, 255, 255, 0.87);
  opacity: 0.6;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    display: ${(props: HeaderProps) => (props.hideMobile ? "none" : "flex")};
  }
`;

const ButtonHeader = styled.div`
  width: 1.2rem;
  margin-right: 1.6rem;
  margin-left: 3.2rem;
  @media (max-width: 600px) {
    flex: 0.3;
  }
`;

const Note = styled.a`
  align-self: flex-end;
  margin-right: 0.5rem;
  font-weight: 500;
  line-height: 4.2rem;
  letter-spacing: 0.25px;
  cursor: pointer;

  font-size: 1.4rem;
  transform: translateY(-4.5rem);
  @media (max-width: 600px) {
    font-size: 1.2rem;
    transform: translateY(-1.5rem);
  }
`;

const ClaimPage = (): JSX.Element => {
  const { t } = useTranslation();

  const lpGaugeEarned = useSelector(selectLpGaugeEarned);
  const totalLpGaugeEarned = useSelector(selectTotalLpGaugeEarned());
  const pools = useSelector(selectPools);

  const [poolsOpen, setPoolsOpen] = useState(true);

  return (
    <StyledPoolsPage>
      <Seo title={t("metadata.claim.title")} description={t("metadata.claim.description")} />
      <ClaimSummary />
      <Headers>
        <Header>{t("headers.asset")}</Header>
        <Header>{t("headers.claimable")}</Header>
        <Header hideMobile>{t("headers.apr")}</Header>
        <ButtonHeader />
      </Headers>
      {totalLpGaugeEarned?.isZero() && (
        <ClaimAccordion
          icon={poolsIcon}
          label={t("claim.pools.header")}
          open={poolsOpen}
          toggle={() => setPoolsOpen(!poolsOpen)}
          rows={
            pools
              ?.filter((pool: Pool) => !lpGaugeEarned[pool.address].isZero())
              .map((pool: Pool) => lpGaugeEarned[pool.address]?.toString() ?? "") ?? []
          }
        />
      )}
      <Note href="https://google.com/" target="_blank" rel="noopener noreferrer">
        {t("claim.helpText")}
      </Note>
    </StyledPoolsPage>
  );
};

export default ClaimPage;
