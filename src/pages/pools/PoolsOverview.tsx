import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectPools, selectPrices } from "../../state/poolsListSlice";
import { Pool } from "../../lib";
import Overview from "../../components/Overview";
import { formatPercent, numberToCompactCurrency } from "../../lib/numeric";

const PoolsOverview = (): JSX.Element => {
  const { t } = useTranslation();
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);

  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;
  const locked = pools.reduce((a: number, b: Pool) => a + b.totalAssets * getPrice(b), 0);
  const averageApy = pools.reduce((a: number, b: Pool) => a + b.apy, 0) / pools.length;

  return (
    <Overview
      header={t("pools.overview.header")}
      rows={[
        {
          label: t("pools.overview.tvl.header"),
          tooltip: t("pools.overview.tvl.tooltip"),
          value: numberToCompactCurrency(locked),
        },
        {
          label: t("pools.overview.apy.header"),
          tooltip: t("pools.overview.apy.tooltip"),
          value: formatPercent(averageApy),
        },
        // {
        //   label: t("pools.overview.revenue.header"),
        //   tooltip: t("pools.overview.revenue.tooltip"),
        //   value: "$0",
        // },
      ]}
    />
  );
};

export default PoolsOverview;
