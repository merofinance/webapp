import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
          header: t("pool.statistics.deposits.header"),
          tooltip: t("pool.statistics.deposits.tooltip"),
          value: formatCurrency(Number(deposits.toString())),
        },
        {
          header: t("pool.statistics.locked.header"),
          tooltip: t("pool.statistics.locked.tooltip"),
          value: formatCurrency(Number(locked.toString())),
        },
        // {
        //   header: t("pool.statistics.rewards.header"),
        //   tooltip: t("pool.statistics.rewards.tooltip"),
        //   value: formatCurrency(0),
        // },
      ]}
    />
  );
};

export default PoolStatistics;
