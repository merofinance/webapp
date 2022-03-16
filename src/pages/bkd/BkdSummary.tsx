import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ScaledNumber } from "scaled-number";

import { useDevice } from "../../app/hooks/use-device";
import SummaryStatistics from "../../components/SummaryStatistics";

const BkdSummary = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const claimableFees = ScaledNumber.fromUnscaled(1243.34);
  const startApr = ScaledNumber.fromUnscaled(0.2345);
  const endApr = ScaledNumber.fromUnscaled(0.4382);

  return (
    <SummaryStatistics
      statistics={[
        {
          label: isMobile ? t("bkd.cards.claimable.headerMobile") : t("bkd.cards.claimable.header"),
          value: claimableFees.toUsdValue(1),
          buttonText: claimableFees.isZero() ? undefined : t("claim.buttons.claim"),
          buttonAction: () => navigate("/claim"),
        },
        {
          primary: true,
          label: t("bkd.cards.apr.header"),
          value: `${startApr.toPercent()} - ${endApr.toPercent()}`,
          subValue: t("bkd.cards.apr.description"),
        },
        {
          label: t("bkd.cards.stake.header"),
          value: "312.34 BKD",
          subValue: "$65,530.34",
        },
      ]}
    />
  );
};

export default BkdSummary;
