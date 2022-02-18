import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import Statistics, { StatisticType } from "../../components/Statistics";
import { formatCurrency } from "../../lib/numeric";
import {
  selectUsersTotalUsdEverywhere,
  selectUsersTotalUsdLocked,
} from "../../state/valueSelectors";
import { ACTIONS_LIVE } from "../../lib/constants";

const PoolsStatistics = (): JSX.Element => {
  const { t } = useTranslation();
  const { chainId } = useWeb3React();
  const usersTotalUsdLocked = useSelector(selectUsersTotalUsdLocked);
  const usersTotalUsdEverywhere = useSelector(selectUsersTotalUsdEverywhere);

  const statistics: StatisticType[] = [
    {
      header: t("pools.statistics.deposits.header"),
      tooltip: t("pools.statistics.deposits.tooltip"),
      value: usersTotalUsdEverywhere
        ? formatCurrency(Number(usersTotalUsdEverywhere.toString()))
        : null,
    },
  ];

  if (ACTIONS_LIVE || chainId !== 1)
    statistics.push({
      header: t("pools.statistics.locked.header"),
      tooltip: t("pools.statistics.locked.tooltip"),
      value: usersTotalUsdLocked ? formatCurrency(Number(usersTotalUsdLocked.toString())) : null,
    });

  // statistics.push({
  //   header: t("pools.statistics.rewards.header"),
  //   tooltip: t("pools.statistics.rewards.tooltip"),
  //   value: "$0.00",
  // });

  return <Statistics statistics={statistics} />;
};

export default PoolsStatistics;
