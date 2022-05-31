import { ScaledNumber } from "scaled-number";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Optional } from "../../lib/types";
import ClaimAccordion from "./ClaimAccordion";
import poolsIcon from "../../assets/sections/pools.svg";
import { selectLpGaugeEarned, selectTotalLpGaugeEarned } from "../../state/userSlice";
import { fetchState, selectPools, selectUserWeightedAverageApy } from "../../state/poolsListSlice";
import { Pool } from "../../lib";
import { useBackd } from "../../app/hooks/use-backd";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";

const ClaimLpRewards = (): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch();
  const updated = useWeb3Updated();

  const lpGaugeEarned = useSelector(selectLpGaugeEarned);
  const totalLpGaugeEarned = useSelector(selectTotalLpGaugeEarned());
  const pools = useSelector(selectPools);
  const weightedAverageApy = useSelector(selectUserWeightedAverageApy());

  const [poolsOpen, setPoolsOpen] = useState(true);

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  if (!pools) return null;

  return (
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
  );
};

export default ClaimLpRewards;
