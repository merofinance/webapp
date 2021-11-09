import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Information from "../../components/Information";
import { Pool } from "../../lib";
import { selectPrice } from "../../state/selectors";
import { formatPercent, numberToCompactCurrency } from "../../lib/numeric";

interface Props {
  pool: Pool | null;
}

const PoolInformation = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const price = useSelector(selectPrice(pool));

  return (
    <Information
      header={t("pool.information.header")}
      rows={[
        {
          label: t("pool.information.tvl.header"),
          tooltip: t("pool.information.tvl.tooltip"),
          value: pool && price ? numberToCompactCurrency(pool.totalAssets * price) : null,
        },
        {
          label: t("pool.information.apy.header"),
          tooltip: t("pool.information.apy.tooltip"),
          value: pool ? formatPercent(pool.apy) : null,
        },
        // {
        //   label: t("pool.information.strategy.header"),
        //   tooltip: t("pool.information.strategy.tooltip"),
        //   value: pool.name,
        //   details: [
        //     {
        //       icon: etherscan,
        //       label: t("pool.information.strategy.details.viewContract"),
        //       link: getEtherscanAddressLink(chainId, pool.address),
        //     },
        //     {
        //       icon: memo,
        //       label: t("pool.information.strategy.details.readMore"),
        //       link: "https://docs.backd.fund/",
        //     },
        //   ],
        // },
      ]}
    />
  );
};

export default PoolInformation;
