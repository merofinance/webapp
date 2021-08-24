import React from "react";
import { useSelector } from "react-redux";
import { Pool } from "../../lib";
import Information from "../../components/Information";
import { selectPrice } from "../../state/selectors";
import { formatPercent, numberToCompactCurrency } from "../../lib/numeric";

interface Props {
  pool: Pool;
}

const PoolInformation = ({ pool }: Props): JSX.Element => {
  const price = useSelector(selectPrice(pool));
  const locked = pool.totalAssets * price;

  return (
    <Information
      header="Pool Information"
      rows={[
        {
          label: "Pool TVL",
          tooltip: "The market capitalization of assets held in the pool (total value locked)",
          value: numberToCompactCurrency(locked),
        },
        {
          label: "APY",
          tooltip: "The current annual percent yield earned by pool LPs",
          value: formatPercent(pool.apy),
        },
        {
          label: "Strategy",
          tooltip: "The current protocol funds are allocated to for yield farming strategies",
          value: pool.name,
        },
      ]}
    />
  );
};

export default PoolInformation;
