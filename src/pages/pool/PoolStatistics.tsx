import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Statistics from "../../components/Statistics";
import { Pool } from "../../lib/types";
import {
  selectPoolDeposits,
  selectPoolLocked,
  selectPoolTotalDeposits,
  selectPrice,
} from "../../state/selectors";

interface Props {
  pool: Pool;
}

const PoolStatistics = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const price = useSelector(selectPrice(pool));
  const locked = useSelector(selectPoolLocked(pool));
  const deposits = useSelector(selectPoolDeposits(pool));
  const totalDeposits = useSelector(selectPoolTotalDeposits(pool));

  return (
    <Statistics
      statistics={[
        {
          header: t("pool.statistics.deposits.header"),
          tooltip: t("pool.statistics.deposits.tooltip"),
          value: deposits ? `${deposits.toCryptoString()} ${pool.underlying.symbol}` : null,
          usd: price && deposits ? deposits.toUsdValue(price) : null,
        },
        {
          header: t("pool.statistics.locked.header"),
          tooltip: t("pool.statistics.locked.tooltip"),
          value: locked ? `${locked.toCryptoString()} ${pool.underlying.symbol}` : null,
          usd: price && locked ? locked.toUsdValue(price) : null,
        },
        {
          header: t("pool.statistics.tvl.header"),
          tooltip: t("pool.statistics.tvl.tooltip"),
          value: totalDeposits
            ? `${totalDeposits.toCryptoString()} ${pool.underlying.symbol}`
            : null,
          usd: price && totalDeposits ? totalDeposits.toUsdValue(price) : null,
        },
      ]}
    />
  );
};

export default PoolStatistics;
