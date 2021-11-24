import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectPools, selectPrices } from "../../state/poolsListSlice";
import { selectBalances } from "../../state/userSlice";
import { Pool } from "../../lib";
import Statistics from "../../components/Statistics";
import { selectPositions } from "../../state/positionsSlice";
import { Position } from "../../lib/types";
import { formatCurrency } from "../../lib/numeric";
import { ScaledNumber } from "../../lib/scaled-number";

const PoolsStatistics = (): JSX.Element => {
  const { t } = useTranslation();
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);
  const balances = useSelector(selectBalances);
  const positions = useSelector(selectPositions);

  const getBalance = (pool: Pool) => balances[pool.lpToken.address] || new ScaledNumber();
  const getPrice = (pool: Pool) => (pool ? prices[pool.underlying.symbol] || 0 : 0);
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
          header: t("pools.statistics.deposits.header"),
          tooltip: t("pools.statistics.deposits.tooltip"),
          value: formatCurrency(Number(deposits.toString())),
        },
        {
          header: t("pools.statistics.locked.header"),
          tooltip: t("pools.statistics.locked.tooltip"),
          value: formatCurrency(Number(locked.toString())),
        },
        // {
        //   header: t("pools.statistics.rewards.header"),
        //   tooltip: t("pools.statistics.rewards.tooltip"),
        //   value: "$0.00",
        // },
      ]}
    />
  );
};

export default PoolsStatistics;
