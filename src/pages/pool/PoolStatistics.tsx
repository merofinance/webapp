import React from "react";
import { useSelector } from "react-redux";
import Statistics from "../../components/Statistics";
import { Pool, Position } from "../../lib/types";
import { selectPrice } from "../../state/selectors";
import { selectBalance } from "../../state/userSlice";
import { selectPoolPositions } from "../../state/positionsSlice";
import { formatCurrency } from "../../lib/numeric";
import { ScaledNumber } from "../../lib/scaled-number";

type Props = {
  pool: Pool;
};

const PoolStatistics = ({ pool }: Props): JSX.Element => {
  const price = useSelector(selectPrice(pool));
  const balance = useSelector(selectBalance(pool));
  const positions = useSelector(selectPoolPositions(pool));

  const locked = positions.reduce(
    (a: ScaledNumber, b: Position) => a.add(b.maxTopUp.mul(price)),
    new ScaledNumber()
  );
  const deposits = locked.add(balance.mul(price));

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
        //   value: formatCurrency(0),
        // },
      ]}
    />
  );
};

export default PoolStatistics;
