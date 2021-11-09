import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Statistics from "../../components/Statistics";
import { Pool } from "../../lib/types";
import { selectPoolDeposits, selectPoolLocked, selectPrice } from "../../state/selectors";

interface Props {
  pool: Pool;
}

const PoolStatistics = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const price = useSelector(selectPrice(pool));
  const locked = useSelector(selectPoolLocked(pool));
  const deposits = useSelector(selectPoolDeposits(pool));

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
        // {
        //   header: t("pool.statistics.rewards.header"),
        //   tooltip: t("pool.statistics.rewards.tooltip"),
        //   value: formatCurrency(0),
        // },
      ]}
    />
  );
};

export default PoolStatistics;
