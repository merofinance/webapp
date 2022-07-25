import { useTranslation } from "react-i18next";
import { ScaledNumber } from "scaled-number";

import { useDevice } from "../../app/hooks/use-device";
import { useNavigateToTop } from "../../app/hooks/use-navigate-to-top";
import SummaryStatistics from "../../components/SummaryStatistics";

const MeroSummary = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigateToTop();
  const { isMobile } = useDevice();
  const claimableFees = ScaledNumber.fromUnscaled(1243.34);
  const startApr = ScaledNumber.fromUnscaled(0.2345);
  const endApr = ScaledNumber.fromUnscaled(0.4382);

  return (
    <SummaryStatistics
      statistics={[
        {
          label: isMobile
            ? t("mero.cards.claimable.headerMobile")
            : t("mero.cards.claimable.header"),
          value: claimableFees.toUsdValue(1),
          buttonText: claimableFees.isZero() ? undefined : t("claim.buttons.claim"),
          buttonAction: () => navigate("/claim"),
        },
        {
          primary: true,
          label: t("mero.cards.apr.header"),
          value: `${startApr.toPercent()} - ${endApr.toPercent()}`,
          subValue: t("mero.cards.apr.description"),
        },
        {
          label: t("mero.cards.stake.header"),
          value: "312.34 MERO",
          subValue: "$65,530.34",
        },
      ]}
    />
  );
};

export default MeroSummary;
