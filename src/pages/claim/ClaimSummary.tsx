import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SummaryStatistics from "../../components/SummaryStatistics";
import { BKD_PRICE } from "../../lib/constants";
import { selectUserWeightedAverageApy } from "../../state/poolsListSlice";
import { selectTotalLpGaugeEarned } from "../../state/userSlice";
import { selectUsersTotalUsdEverywhere } from "../../state/valueSelectors";

const ClaimSummary = (): JSX.Element => {
  const { t } = useTranslation();
  const usersTotalUsdEverywhere = useSelector(selectUsersTotalUsdEverywhere);
  const totalLpGaugeEarned = useSelector(selectTotalLpGaugeEarned());
  const weightedAverageApy = useSelector(selectUserWeightedAverageApy());

  return (
    <SummaryStatistics
      statistics={[
        {
          label: t("claim.overview.claimable"),
          value: totalLpGaugeEarned ? totalLpGaugeEarned.toUsdValue(BKD_PRICE) : null,
          subValue: t("claim.overview.claimableSubheader"),
        },
        {
          label: t("claim.overview.daily"),
          value:
            usersTotalUsdEverywhere && weightedAverageApy
              ? usersTotalUsdEverywhere.mul(weightedAverageApy).div(365).toUsdValue(1)
              : null,
          subValue: t("claim.overview.yearly", {
            amount:
              usersTotalUsdEverywhere && weightedAverageApy
                ? usersTotalUsdEverywhere.mul(weightedAverageApy).toCompactUsdValue(1)
                : "$---",
          }),
        },
        {
          label: t("claim.overview.deposits"),
          value: usersTotalUsdEverywhere ? usersTotalUsdEverywhere.toUsdValue(1) : null,
        },
      ]}
    />
  );
};

export default ClaimSummary;
