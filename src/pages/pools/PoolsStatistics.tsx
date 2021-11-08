import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Statistics from "../../components/Statistics";
import { formatCurrency } from "../../lib/numeric";
import { selectTotalDeposits, selectTotalLocked } from "../../state/selectors";

const PoolsStatistics = (): JSX.Element => {
  const { t } = useTranslation();
  const locked = useSelector(selectTotalLocked());
  const deposits = useSelector(selectTotalDeposits());

  return (
    <Statistics
      statistics={[
        {
          header: t("pools.statistics.deposits.header"),
          tooltip: t("pools.statistics.deposits.tooltip"),
          value: deposits ? formatCurrency(Number(deposits.toString())) : null,
        },
        {
          header: t("pools.statistics.locked.header"),
          tooltip: t("pools.statistics.locked.tooltip"),
          value: locked ? formatCurrency(Number(locked.toString())) : null,
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
