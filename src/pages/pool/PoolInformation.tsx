import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import { useWeb3React } from "@web3-react/core";

import Information from "../../components/Information";
import { Pool } from "../../lib";
import { selectPrice } from "../../state/selectors";
import { formatPercent, numberToCompactCurrency } from "../../lib/numeric";
import { Optional } from "../../lib/types";
// import etherscan from "../../assets/ui/etherscan.svg";
// import memo from "../../assets/ui/memo.svg";
// import { getEtherscanAddressLink } from "../../lib/web3";

interface Props {
  pool: Optional<Pool>;
}

const PoolInformation = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const price = useSelector(selectPrice(pool));
  // const { chainId } = useWeb3React();
  const maxWithdrawalFee = pool ? `${(pool.maxWithdrawalFee * 100).toString()}%` : null;
  const minWithdrawalFee = pool ? `${(pool.minWithdrawalFee * 100).toString()}%` : null;
  const days = pool ? (pool.feeDecreasePeriod * 10 ** 18) / 86400 : null;

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
          value: pool && pool.apy ? formatPercent(pool.apy) : null,
        },
        {
          label: pool ? `${pool.lpToken.symbol}/${pool.underlying.symbol}` : null,
          tooltip: t("pool.information.lp.tooltip", {
            lpToken: pool ? pool.lpToken.symbol : "---",
            underlying: pool ? pool.underlying.symbol : "---",
            exchangeRate: pool ? pool.exchangeRate.toString() : "---",
          }),
          value: pool ? pool.exchangeRate.toString() : null,
        },
        {
          label: t("pool.information.withdrawalFees.header"),
          tooltip: t("pool.information.withdrawalFees.tooltip", {
            max: maxWithdrawalFee || "---",
            min: minWithdrawalFee || "---",
            days: days || "---",
          }),
          value: pool ? `${maxWithdrawalFee} → ${minWithdrawalFee}` : null,
        },
        // {
        //   label: t("pool.information.strategy.header"),
        //   tooltip: t("pool.information.strategy.tooltip"),
        //   tooltipItems: [
        //     {
        //       label: t("pool.information.strategy.tooltipItemLabels.strategist"),
        //       value: "5%",
        //     },
        //     {
        //       label: t("pool.information.strategy.tooltipItemLabels.treasury"),
        //       value: "10%",
        //     },
        //     {
        //       label: t("pool.information.strategy.tooltipItemLabels.reserve"),
        //       value: "5%",
        //     },
        //   ],
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
