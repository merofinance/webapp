import React from "react";
import { useSelector } from "react-redux";
import Statistics from "../../components/Statistics";
import { Pool, Position } from "../../lib/types";
import { selectPrice } from "../../features/pool/selectors";
import { selectBalance } from "../../features/user/userSlice";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import { selectPoolPositions } from "../../features/positions/positionsSlice";

type Props = {
  pool: Pool;
};

const PoolStatistics = ({ pool }: Props) => {
  const price = useSelector(selectPrice(pool));
  const balance = useSelector(selectBalance(pool));
  const positions = useSelector(selectPoolPositions(pool));

  const locked = positions.reduce((a: number, b: Position) => b.totalTopUp * price + a, 0);
  const deposits = balance * price + locked;

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

export default PoolStatistics;
