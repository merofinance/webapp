import { ScaledNumber } from "scaled-number";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Optional } from "../../lib/types";
import ClaimAccordion from "./ClaimAccordion";
import keepersIcon from "../../assets/sections/keepers.svg";
import { selectKeeperGaugeEarned, selectTotalKeeperGaugeEarned } from "../../state/userSlice";
import { fetchState, selectPools } from "../../state/poolsListSlice";
import { Pool } from "../../lib";
import { useBackd } from "../../app/hooks/use-backd";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";

const ClaimKeeperRewards = (): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch();
  const updated = useWeb3Updated();

  const keeperGaugeEarned = useSelector(selectKeeperGaugeEarned);
  const totalKeeperGaugeEarned = useSelector(selectTotalKeeperGaugeEarned());
  const pools = useSelector(selectPools);

  const [poolsOpen, setPoolsOpen] = useState(true);

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  if (!pools) return null;

  return (
    <ClaimAccordion
      icon={keepersIcon}
      label={t("claim.keeper.header")}
      open={poolsOpen}
      toggle={() => setPoolsOpen(!poolsOpen)}
      claimable={totalKeeperGaugeEarned}
      rows={pools
        .filter((pool: Pool) => {
          if (!keeperGaugeEarned[pool.address]) return false;
          if (keeperGaugeEarned[pool.address].isZero()) return false;
          return true;
        })
        .map((pool: Pool) => {
          const claimable = keeperGaugeEarned[pool.address];
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
    />
  );
};

export default ClaimKeeperRewards;
