import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import Statistics, { StatisticType } from "../../components/Statistics";
import { Optional, Pool } from "../../lib/types";
import {
  selectUsersPoolUnderlyingEverywhere,
  selectProtocolPoolUnderlyingEverywhere,
  selectUsersPoolUnderlyingLocked,
} from "../../state/valueSelectors";
import { selectPrice } from "../../state/poolsListSlice";
import { ACTIONS_LIVE } from "../../lib/constants";

interface Props {
  pool: Optional<Pool>;
}

const PoolStatistics = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { chainId } = useWeb3React();
  const price = useSelector(selectPrice(pool));
  const locked = useSelector(selectUsersPoolUnderlyingLocked(pool));
  const deposits = useSelector(selectUsersPoolUnderlyingEverywhere(pool));
  const totalDeposits = useSelector(selectProtocolPoolUnderlyingEverywhere(pool));

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

  statistics.push({
    header: t("pool.statistics.tvl.header"),
    tooltip: t("pool.statistics.tvl.tooltip"),
    value:
      pool && totalDeposits && totalDeposits.toCryptoString
        ? `${totalDeposits.toCryptoString()} ${pool.underlying.symbol}`
        : null,
    usd:
      price && totalDeposits && totalDeposits.toUsdValue ? totalDeposits.toUsdValue(price) : null,
  });

  return <Statistics statistics={statistics} />;
};

export default PoolStatistics;
