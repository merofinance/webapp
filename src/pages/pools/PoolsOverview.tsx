import React from "react";
import { useSelector } from "react-redux";
import { selectPools, selectPrices } from "../../features/pools-list/poolsListSlice";
import { Pool } from "../../lib";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import Overview from "../../components/Overview";
import { formatPercent, numberToCompactCurrency } from "../../lib/numeric";

const PoolsOverview = () => {
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);

  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;
  const locked = pools.reduce((a: number, b: Pool) => a + b.totalAssets * getPrice(b), 0);
  const averageApy = pools.reduce((a: number, b: Pool) => a + b.apy, 0) / pools.length;

  return (
    <Overview
      header="Pools Overview"
      rows={[
        {
          label: "Platform TVL",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: numberToCompactCurrency(locked),
        },
        {
          label: "Average APY",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: formatPercent(averageApy),
        },
        // {
        //   label: "Revenue",
        //   tooltip: PLACEHOLDER_TOOLTIP,
        //   value: "$0",
        // },
      ]}
    />
  );
};

export default PoolsOverview;
