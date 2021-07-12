import React from "react";
import { useSelector } from "react-redux";
import { selectPrices } from "../../features/pools-list/poolsListSlice";
import { Pool } from "../../lib";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import Overview from "../../components/Overview";

interface Props {
  pool: Pool;
}

const PoolOverview = ({ pool }: Props) => {
  const prices = useSelector(selectPrices);

  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;
  const locked = pool.totalAssets * getPrice(pool);

  const averageApy = pool.apy;

  return (
    <Overview
      header="Pool Overview"
      rows={[
        {
          label: "Pool TVL",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: `$${locked.toLocaleString()}`,
        },
        {
          label: "APY",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: `${averageApy.toLocaleString()}%`,
        },
        {
          label: "Strategy",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: pool.name,
        },
      ]}
    />
  );
};

export default PoolOverview;
