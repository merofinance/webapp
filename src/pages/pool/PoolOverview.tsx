import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Pool } from "../../lib";
import Overview from "../../components/Overview";
import { selectPrice } from "../../state/selectors";
import { formatPercent, numberToCompactCurrency } from "../../lib/numeric";

interface Props {
  pool: Pool;
}

const PoolOverview = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const price = useSelector(selectPrice(pool));
  const locked = pool.totalAssets * price;

  return (
    <Overview
      header={t("pool.overview.header")}
      rows={[
        {
          label: t("pool.overview.tvl.header"),
          tooltip: t("pool.overview.tvl.tooltip"),
          value: numberToCompactCurrency(locked),
        },
        {
          label: t("pool.overview.apy.header"),
          tooltip: t("pool.overview.apy.tooltip"),
          value: formatPercent(pool.apy),
        },
        {
          label: t("pool.overview.strategy.header"),
          tooltip: t("pool.overview.strategy.tooltip"),
          value: pool.name,
        },
      ]}
    />
  );
};

export default PoolOverview;
