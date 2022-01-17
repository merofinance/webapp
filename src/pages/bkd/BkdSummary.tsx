import { useDevice } from "../../app/hooks/use-device";
import SummaryStatistics from "../../components/SummaryStatistics";
import { formatPercent } from "../../lib/numeric";
import { ScaledNumber } from "../../lib/scaled-number";

const BkdSummary = (): JSX.Element => {
  const { isMobile } = useDevice();
  const claimableFees = ScaledNumber.fromUnscaled(1243.34);
  const startApr = ScaledNumber.fromUnscaled(0.2345);
  const endApr = ScaledNumber.fromUnscaled(0.4382);

  return (
    <SummaryStatistics
      statistics={[
        {
          label: isMobile ? "bkd.cards.claimable.headerMobile" : "bkd.cards.claimable.header",
          value: claimableFees.toUsdValue(1),
          buttonText: claimableFees.isZero() ? undefined : "Claim",
          buttonAction: () => console.log("todo"),
        },
        {
          primary: true,
          label: "bkd.cards.apr.header",
          value: `${formatPercent(Number(startApr.toString()))} - ${formatPercent(
            Number(endApr.toString())
          )}`,
          subValue: "bkd.cards.apr.description",
        },
        {
          label: "bkd.cards.stake.header",
          value: "312.34 BKD",
          subValue: "$65,530.34",
        },
      ]}
    />
  );
};

export default BkdSummary;
