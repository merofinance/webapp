import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Statistics from "../../components/Statistics";
import { formatCurrency } from "../../lib/numeric";
import {
  selectUsersTotalUsdEverywhere,
  selectUsersTotalUsdLocked,
} from "../../state/valueSelectors";

const PoolsStatistics = (): JSX.Element => {
  const { t } = useTranslation();
  const usersTotalUsdLocked = useSelector(selectUsersTotalUsdLocked);
  const usersTotalUsdEverywhere = useSelector(selectUsersTotalUsdEverywhere);

  return (
    <Statistics
      statistics={[
        {
          header: t("pools.statistics.deposits.header"),
          tooltip: t("pools.statistics.deposits.tooltip"),
          value: usersTotalUsdEverywhere
            ? formatCurrency(Number(usersTotalUsdEverywhere.toString()))
            : null,
        },
        {
          header: t("pools.statistics.locked.header"),
          tooltip: t("pools.statistics.locked.tooltip"),
          value: usersTotalUsdLocked
            ? formatCurrency(Number(usersTotalUsdLocked.toString()))
            : null,
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
