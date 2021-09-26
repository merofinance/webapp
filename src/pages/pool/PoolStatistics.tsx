import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Statistics from "../../components/Statistics";
import { Pool, Position } from "../../lib/types";
import { selectPrice } from "../../state/selectors";
import { selectBalance } from "../../state/userSlice";
import { selectPoolPositions } from "../../state/positionsSlice";
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
    (a: ScaledNumber, b: Position) => a.add(b.maxTopUp),
    new ScaledNumber()
  );

  const deposits = locked.add(balance);

  return (
    <Statistics
      statistics={[
        {
          header: t("pool.statistics.deposits.header"),
          tooltip: t("pool.statistics.deposits.tooltip"),
          value: `${deposits.toCryptoString()} ${pool.underlying.symbol}`,
          usd: deposits.toUsdValue(price),
        },
        {
          header: t("pool.statistics.locked.header"),
          tooltip: t("pool.statistics.locked.tooltip"),
          value: `${locked.toCryptoString()} ${pool.underlying.symbol}`,
          usd: locked.toUsdValue(price),
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
