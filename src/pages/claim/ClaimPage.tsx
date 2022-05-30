import { ScaledNumber } from "scaled-number";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Seo from "../../components/Seo";
import ClaimSummary from "./ClaimSummary";
import ClaimAccordion from "./ClaimAccordion";

import poolsIcon from "../../assets/sections/pools.svg";
import { selectLpGaugeEarned, selectTotalLpGaugeEarned } from "../../state/userSlice";
import { fetchState, selectPools, selectUserWeightedAverageApy } from "../../state/poolsListSlice";
import { Pool } from "../../lib";
import { useBackd } from "../../app/hooks/use-backd";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import Loader from "../../components/Loader";
import { GradientLink, GradientText } from "../../styles/GradientText";
import { DOCS_KEEPERS_LINK } from "../../lib/links";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  font-size: 2.8rem;
  font-weight: 600;
  letter-spacing: 0.25px;
  margin: auto;

  @media (max-width: 600px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const EmptyStateButton = styled.button`
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  font-size: 2.8rem;
  font-weight: 600;
  letter-spacing: 0.25px;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const EmptyStateLink = styled(GradientLink)`
  font-size: 2.8rem;
  font-weight: 600;
  letter-spacing: 0.25px;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
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
  const navigate = useNavigate();

  const lpGaugeEarned = useSelector(selectLpGaugeEarned);
  const totalLpGaugeEarned = useSelector(selectTotalLpGaugeEarned());
  const pools = useSelector(selectPools);
  const weightedAverageApy = useSelector(selectUserWeightedAverageApy());

  const [poolsOpen, setPoolsOpen] = useState(true);

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  const hasLoaded = pools && lpGaugeEarned;

  const hasLpEarned = pools?.some(
    (pool: Pool) => lpGaugeEarned[pool.address] && !lpGaugeEarned[pool.address].isZero()
  );

  const hasAnyEarned = hasLpEarned;

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
          {!hasAnyEarned && (
            <EmptyState>
              <Trans i18nKey="claim.empty">
                <EmptyStateButton type="button" onClick={() => navigate("/pools")}>
                  pool
                </EmptyStateButton>
                <EmptyStateLink href={DOCS_KEEPERS_LINK} target="_blank" rel="noopener noreferrer">
                  keeper
                </EmptyStateLink>
              </Trans>
            </EmptyState>
          )}
          {hasLpEarned && (
            <>
              <Headers>
                <Header>{t("headers.asset")}</Header>
                <Header>{t("headers.claimable")}</Header>
                <Header hideMobile>{t("headers.apy")}</Header>
                <ButtonHeader />
              </Headers>
              <ClaimAccordion
                icon={poolsIcon}
                label={t("claim.pools.header")}
                open={poolsOpen}
                toggle={() => setPoolsOpen(!poolsOpen)}
                claimable={totalLpGaugeEarned}
                rows={pools
                  .filter((pool: Pool) => {
                    if (!lpGaugeEarned[pool.address]) return false;
                    if (lpGaugeEarned[pool.address].isZero()) return false;
                    return true;
                  })
                  .map((pool: Pool) => {
                    const claimable = lpGaugeEarned[pool.address];
                    if (!claimable)
                      return {
                        pool,
                        claimable: new ScaledNumber(),
                      };
                    return {
                      pool,
                      claimable,
                    };
                  })}
                apy={weightedAverageApy}
              />
            </>
          )}
        </>
      )}
    </StyledPoolsPage>
  );
};

export default ClaimPage;
