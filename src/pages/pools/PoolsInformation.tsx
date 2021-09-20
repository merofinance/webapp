import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectPools, selectPrices } from "../../state/poolsListSlice";
import { Pool } from "../../lib";
import Information from "../../components/Information";
import { formatPercent, numberToCompactCurrency } from "../../lib/numeric";

const PoolsInformation = (): JSX.Element => {
  const { t } = useTranslation();
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);

  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;
  const locked = pools.reduce((a: number, b: Pool) => a + b.totalAssets * getPrice(b), 0);
  const averageApy = pools.reduce((a: number, b: Pool) => a + b.apy, 0) / pools.length;

  return (
    <Information
      header={t("pools.information.header")}
      rows={[
        {
          label: t("pools.information.tvl.header"),
          tooltip: t("pools.information.tvl.tooltip"),
          value: numberToCompactCurrency(locked),
        },
        {
          label: t("pools.information.apy.header"),
          tooltip: t("pools.information.apy.tooltip"),
          value: formatPercent(averageApy),
        },
        // {
        //   label: t("pools.information.revenue.header"),
        //   tooltip: t("pools.information.revenue.tooltip"),
        //   value: "$0",
        // },
      ]}
    />
  );
};

export default PoolsInformation;
