import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Information from "../../components/Information";
import { selectProtocolTotalUsdEverywhere } from "../../state/valueSelectors";
import { selectAverageApy } from "../../state/poolsListSlice";

const PoolsInformation = (): JSX.Element => {
  const { t } = useTranslation();
  const totalDeposits = useSelector(selectProtocolTotalUsdEverywhere);
  const averageApy = useSelector(selectAverageApy);

  return (
    <Information
      header={t("pools.information.header")}
      rows={[
        {
          label: t("pools.information.tvl.header"),
          tooltip: t("pools.information.tvl.tooltip"),
          value: totalDeposits ? totalDeposits.toCompactUsdValue(1) : null,
        },
        {
          label: t("pools.information.apy.header"),
          tooltip: t("pools.information.apy.tooltip"),
          value: averageApy ? averageApy.toPercent() : null,
        },
        // {
        //   label: t("pools.information.revenue.header"),
        //   tooltip: t("pools.information.revenue.tooltip"),
        //   value: "$0",
        // },
      ]}
    />
  );
};

export default PoolsInformation;
