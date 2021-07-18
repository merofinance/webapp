import React from "react";
import { useSelector } from "react-redux";
import { selectPools, selectPrices } from "../../features/pools-list/poolsListSlice";
import { selectBalances } from "../../features/user/userSlice";
import { Pool } from "../../lib";
import Statistics from "../../components/Statistics";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import { selectPositions } from "../../features/positions/positionsSlice";
import { Position } from "../../lib/types";
import { formatCurrency } from "../../lib/numeric";

const PoolsStatistics = () => {
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);
  const balances = useSelector(selectBalances);
  const positions = useSelector(selectPositions);

  const getBalance = (pool: Pool) => balances[pool.lpToken.address] || 0;
  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;
  const getPool = (tokenAddress: string) =>
    pools.filter((pool: Pool) => pool.underlying.address === tokenAddress)[0];

  const locked = positions.reduce(
    (a: number, b: Position) => b.maxTopUp * getPrice(getPool(b.actionToken)) + a,
    0
  );
  const deposits =
    pools.reduce((a: number, b: Pool) => a + getBalance(b) * getPrice(b), 0) + locked;

  return (
    <Statistics
      statistics={[
        {
          header: "Your deposits",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: formatCurrency(deposits),
        },
        {
          header: "Locked in position",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: formatCurrency(locked),
        },
        // {
        //   header: "Rewards accrued",
        //   tooltip: PLACEHOLDER_TOOLTIP,
        //   value: "$0.00",
        // },
      ]}
    />
  );
};

export default PoolsStatistics;
