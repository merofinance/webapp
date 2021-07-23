import React from "react";
import { useSelector } from "react-redux";
import { selectPools, selectPrices } from "../../features/pools-list/poolsListSlice";
import { selectBalances } from "../../features/user/userSlice";
import { Pool } from "../../lib";
import Statistics from "../../components/Statistics";
import { selectPositions } from "../../features/positions/positionsSlice";
import { Position } from "../../lib/types";
import { formatCurrency } from "../../lib/numeric";
import { TokenValue } from "../../lib/token-value";

const PoolsStatistics = () => {
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);
  const balances = useSelector(selectBalances);
  const positions = useSelector(selectPositions);

  const getBalance = (pool: Pool) => balances[pool.lpToken.address] || new TokenValue(0);
  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;
  const getPool = (tokenAddress: string) =>
    pools.filter((pool: Pool) => pool.underlying.address === tokenAddress)[0];

  const locked = positions.reduce(
    (a: number, b: Position) => b.maxTopUp.toNumber() * getPrice(getPool(b.actionToken)) + a,
    0
  );
  const deposits =
    pools.reduce((a: number, b: Pool) => a + getBalance(b).toNumber() * getPrice(b), 0) + locked;

  return (
    <Statistics
      statistics={[
        {
          header: "Your deposits",
          tooltip: "The current value of your assets held in Backd liquidity pools",
          value: formatCurrency(deposits),
        },
        {
          header: "Locked in position",
          tooltip:
            "The current value of your assets registered for top-ups (liquidation protection)",
          value: formatCurrency(locked),
        },
        // {
        //   header: "Rewards accrued",
        //   tooltip: "The current value of earned rewards that have yet to be claimed",
        //   value: "$0.00",
        // },
      ]}
    />
  );
};

export default PoolsStatistics;
