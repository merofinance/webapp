import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import Information from "../../components/Information";
import { Pool } from "../../lib";
import { selectPrice } from "../../state/poolsListSlice";
import { Optional } from "../../lib/types";
import etherscan from "../../assets/ui/etherscan.svg";
import memo from "../../assets/ui/memo.svg";
import { getEtherscanAddressLink } from "../../lib/web3";
import { selectUsersPoolUnderlyingEverywhere } from "../../state/valueSelectors";

interface Props {
  pool: Optional<Pool>;
}

const PoolInformation = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const price = useSelector(selectPrice(pool));
  const usersPoolUnderlyingEverywhere = useSelector(selectUsersPoolUnderlyingEverywhere(pool));
  const { chainId } = useWeb3React();
  const maxWithdrawalFee =
    pool && pool.maxWithdrawalFee.toPercent ? pool.maxWithdrawalFee.toPercent() : null;
  const minWithdrawalFee =
    pool && pool.minWithdrawalFee.toPercent ? pool.minWithdrawalFee.toPercent() : null;
  const days = pool ? pool.feeDecreasePeriod.toNumber() / 86400 : null;

  return (
    <Information
      header={t("pool.information.header")}
      rows={[
        {
          label: t("pool.information.tvl.header"),
          tooltip: t("pool.information.tvl.tooltip"),
          value:
            pool && price && pool.totalAssets.toCompactUsdValue
              ? pool.totalAssets.toCompactUsdValue(price)
              : null,
        },
        {
          label: t("pool.information.apy.header"),
          tooltip: t("pool.information.apy.tooltip"),
          value: pool && pool.apy && pool.apy.toPercent ? pool.apy.toPercent() : null,
        },
        {
          label: pool ? `${pool.lpToken.symbol}/${pool.underlying.symbol}` : null,
          tooltip: t("pool.information.lp.tooltip", {
            lpToken: pool ? pool.lpToken.symbol : "---",
            underlying: pool ? pool.underlying.symbol : "---",
            exchangeRate: pool ? pool.exchangeRate.toString() : "---",
          }),
          value:
            pool && pool.exchangeRate.toCryptoString ? pool.exchangeRate.toCryptoString() : null,
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
        {
          label: t("pool.information.yourShare.header"),
          tooltip: t("pool.information.yourShare.tooltip"),
          value:
            pool && usersPoolUnderlyingEverywhere
              ? usersPoolUnderlyingEverywhere.div(pool.totalAssets).toPercent()
              : null,
        },
        {
          label: t("pool.information.strategy.header"),
          tooltip: t("pool.information.strategy.tooltip"),
          tooltipItems: undefined,
          // tooltipItems: [
          //   {
          //     label: t("pool.information.strategy.tooltipItemLabels.strategist"),
          //     value: "5%",
          //   },
          //   {
          //     label: t("pool.information.strategy.tooltipItemLabels.treasury"),
          //     value: "10%",
          //   },
          //   {
          //     label: t("pool.information.strategy.tooltipItemLabels.reserve"),
          //     value: "5%",
          //   },
          // ],
          value: pool ? pool.strategyName : null,
          details: [
            {
              icon: etherscan,
              label: t("pool.information.strategy.details.viewContract"),
              link: pool ? getEtherscanAddressLink(chainId, pool.strategyAddress) : "",
            },
            {
              icon: memo,
              label: t("pool.information.strategy.details.readMore"),
              link: "https://docs.backd.fund/protocol-architecture/pools/strategies",
            },
          ],
        },
      ]}
    />
  );
};

export default PoolInformation;
