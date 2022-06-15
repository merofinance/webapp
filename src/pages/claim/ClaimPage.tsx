import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Seo from "../../components/Seo";
import ClaimSummary from "./ClaimSummary";

import {
  selectKeeperGaugeEarned,
  selectLpGaugeEarned,
  selectTotalKeeperGaugeEarned,
  selectTotalLpGaugeEarned,
} from "../../state/userSlice";
import { fetchState, selectPools } from "../../state/poolsListSlice";
import { Pool } from "../../lib";
import { useBackd } from "../../app/hooks/use-backd";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import Loader from "../../components/Loader";
import ClaimEmptyState from "./ClaimEmptyState";
import ClaimLpRewards from "./ClaimLpRewards";
import ClaimKeeperRewards from "./ClaimKeeperRewards";

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
  width: 12rem;
  @media (max-width: 600px) {
    flex: 0.3;
  }
`;

const ClaimPage = (): JSX.Element => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch();
  const updated = useWeb3Updated();

  const lpGaugeEarned = useSelector(selectLpGaugeEarned);
  const keeperGaugeEarned = useSelector(selectKeeperGaugeEarned);
  const totalKeeperGaugeEarned = useSelector(selectTotalKeeperGaugeEarned());
  const totalLpGaugeEarned = useSelector(selectTotalLpGaugeEarned());
  const pools = useSelector(selectPools);

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  const hasLoaded =
    pools &&
    lpGaugeEarned &&
    keeperGaugeEarned &&
    !pools.some((pool: Pool) => !lpGaugeEarned[pool.address]) &&
    !pools.some((pool: Pool) => !keeperGaugeEarned[pool.address]);

  const hasLpEarned = totalLpGaugeEarned && !totalLpGaugeEarned.isZero();
  const hasKeeperEarned = totalKeeperGaugeEarned && !totalKeeperGaugeEarned.isZero();

  const hasAnyEarned = hasLpEarned || hasKeeperEarned;

  return (
    <StyledPoolsPage>
      <Seo title={t("metadata.claim.title")} description={t("metadata.claim.description")} />
      <ClaimSummary />
      {!hasLoaded && (
        <>
          <Loader row />
          <Loader row />
          <Loader row />
        </>
      )}
      {hasLoaded && (
        <>
          {!hasAnyEarned && <ClaimEmptyState />}
          {hasAnyEarned && (
            <Headers>
              <Header>{t("headers.asset")}</Header>
              <Header>{t("headers.claimable")}</Header>
              <Header hideMobile>{t("headers.apy")}</Header>
              <ButtonHeader />
            </Headers>
          )}
          {hasLpEarned && <ClaimLpRewards />}
          {hasKeeperEarned && <ClaimKeeperRewards />}
        </>
      )}
    </StyledPoolsPage>
  );
};

export default ClaimPage;
