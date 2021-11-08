import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectAverageApy } from "../../state/poolsListSlice";
import Information from "../../components/Information";
import { formatPercent } from "../../lib/numeric";
import { selectTotalLocked } from "../../state/selectors";

const PoolsInformation = (): JSX.Element => {
  const { t } = useTranslation();
  const locked = useSelector(selectTotalLocked());
  const averageApy = useSelector(selectAverageApy);

  return (
    <Information
      header={t("pools.information.header")}
      rows={[
        {
          label: t("pools.information.tvl.header"),
          tooltip: t("pools.information.tvl.tooltip"),
          value: locked ? locked.toCompactUsdValue(1) : null,
        },
        {
          label: t("pools.information.apy.header"),
          tooltip: t("pools.information.apy.tooltip"),
          value: averageApy ? formatPercent(averageApy) : null,
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
