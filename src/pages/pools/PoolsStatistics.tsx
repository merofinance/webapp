import React from "react";
import { useSelector } from "react-redux";
import { selectPools, selectPrices } from "../../features/pools-list/poolsListSlice";
import { selectBalances } from "../../features/user/userSlice";
import { Pool } from "../../lib";
import Statistics from "../../components/Statistics";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";

const PoolsStatistics = () => {
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);
  const balances = useSelector(selectBalances);

  const getBalance = (pool: Pool) => balances[pool.lpToken.address] || 0;
  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;

  const deposits = pools.reduce((a: number, b: Pool) => a + getBalance(b) * getPrice(b), 0);
  const locked = pools.reduce((a: number, b: Pool) => a + b.totalAssets * getPrice(b), 0);

  return (
    <Statistics
      statistics={[
        {
          header: "Your deposits",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: `$${deposits.toLocaleString()}`,
        },
        {
          header: "Locked in position",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: `$${locked.toLocaleString()}`,
        },
        {
          header: "Rewards accrued",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: "$0.00",
        },
      ]}
    />
  );
};

export default PoolsStatistics;
