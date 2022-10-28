import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import Statistics, { StatisticType } from "../../components/Statistics";
import { Optional, Pool } from "../../lib/types";
import {
  selectUsersPoolUnderlyingEverywhere,
  selectUsersPoolUnderlyingLocked,
} from "../../state/valueSelectors";
import { selectPrice } from "../../state/poolsListSlice";
import { ACTIONS_LIVE } from "../../lib/constants";
import useEarned from "../../app/hooks/use-earned";

interface Props {
  pool: Optional<Pool>;
}

const PoolStatistics = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { chainId } = useWeb3React();
  const price = useSelector(selectPrice(pool));
  const locked = useSelector(selectUsersPoolUnderlyingLocked(pool));
  const deposits = useSelector(selectUsersPoolUnderlyingEverywhere(pool));
  const earned = useEarned(pool);

  const statistics: StatisticType[] = [
    {
      header: t("pool.statistics.deposits.header"),
      tooltip: t("pool.statistics.deposits.tooltip"),
      value:
        pool && deposits && deposits.toCryptoString
          ? `${deposits.toCryptoString()} ${pool.underlying.symbol}`
          : null,
      usd: pool && price && deposits && deposits.toUsdValue ? deposits.toUsdValue(price) : null,
    },
  ];

  statistics.push({
    header: t("pool.statistics.earned.header"),
    tooltip: t("pool.statistics.earned.tooltip"),
    value:
      pool && earned && earned.toCryptoString
        ? `${earned.toCryptoString()} ${pool.underlying.symbol}`
        : null,
    usd: price && earned && earned.toUsdValue ? earned.toUsdValue(price) : null,
  });

  if (ACTIONS_LIVE || chainId !== 1)
    statistics.push({
      header: t("pool.statistics.locked.header"),
      tooltip: t("pool.statistics.locked.tooltip"),
      value:
        pool && locked && locked.toCryptoString
          ? `${locked.toCryptoString()} ${pool.underlying.symbol}`
          : null,
      usd: price && locked && locked.toUsdValue ? locked.toUsdValue(price) : null,
    });

  return <Statistics statistics={statistics} />;
};

export default PoolStatistics;
