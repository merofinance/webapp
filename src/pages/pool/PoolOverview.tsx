import React from "react";
import { useSelector } from "react-redux";
import { Pool } from "../../lib";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import Overview from "../../components/Overview";
import { selectPrice } from "../../features/pool/selectors";

interface Props {
  pool: Pool;
}

const PoolOverview = ({ pool }: Props) => {
  const price = useSelector(selectPrice(pool));
  const locked = pool.totalAssets * price;

  return (
    <Overview
      header="Pool Overview"
      rows={[
        {
          label: "Pool TVL",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: `$${locked.toLocaleString()}`,
        },
        {
          label: "APY",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: `${pool.apy.toLocaleString()}%`,
        },
        {
          label: "Strategy",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: pool.name,
        },
      ]}
    />
  );
};

export default PoolOverview;
