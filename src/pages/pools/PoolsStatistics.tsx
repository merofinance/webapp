import React from "react";
import { useSelector } from "react-redux";
import { selectPools, selectPrices } from "../../state/poolsListSlice";
import { selectBalances } from "../../state/userSlice";
import { Pool } from "../../lib";
import Statistics from "../../components/Statistics";
import { selectPositions } from "../../state/positionsSlice";
import { Position } from "../../lib/types";
import { formatCurrency } from "../../lib/numeric";
import { ScaledNumber } from "../../lib/scaled-number";

const PoolsStatistics = (): JSX.Element => {
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);
  const balances = useSelector(selectBalances);
  const positions = useSelector(selectPositions);

  const getBalance = (pool: Pool) => balances[pool.lpToken.address] || new ScaledNumber();
  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;
  const getPool = (tokenAddress: string) =>
    pools.filter((pool: Pool) => pool.underlying.address === tokenAddress)[0];

  const locked = positions.reduce(
    (a: ScaledNumber, b: Position) => a.add(b.maxTopUp.mul(getPrice(getPool(b.actionToken)))),
    new ScaledNumber()
  );
  const deposits = locked.add(
    pools.reduce(
      (a: ScaledNumber, b: Pool) => a.add(getBalance(b).mul(getPrice(b))),
      new ScaledNumber()
    )
  );

  return (
    <Statistics
      statistics={[
        {
          header: "Your deposits",
          tooltip: "The current value of your assets held in Backd liquidity pools",
          value: formatCurrency(Number(deposits.toString())),
        },
        {
          header: "Locked in position",
          tooltip:
            "The current value of your assets registered for top-ups (liquidation protection)",
          value: formatCurrency(Number(locked.toString())),
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
