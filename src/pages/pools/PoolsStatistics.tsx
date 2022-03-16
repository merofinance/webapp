import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import Statistics, { StatisticType } from "../../components/Statistics";
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
      value: usersTotalUsdEverywhere ? usersTotalUsdEverywhere.toUsdValue(1) : null,
    },
  ];

  if (ACTIONS_LIVE || chainId !== 1)
    statistics.push({
      header: t("pools.statistics.locked.header"),
      tooltip: t("pools.statistics.locked.tooltip"),
      value: usersTotalUsdLocked ? usersTotalUsdLocked.toUsdValue(1) : null,
    });

  // statistics.push({
  //   header: t("pools.statistics.rewards.header"),
  //   tooltip: t("pools.statistics.rewards.tooltip"),
  //   value: "$0.00",
  // });

  return <Statistics statistics={statistics} />;
};

export default PoolsStatistics;
