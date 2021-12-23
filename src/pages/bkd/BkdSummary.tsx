import SummaryStatistics from "../../components/SummaryStatistics";
import { ScaledNumber } from "../../lib/scaled-number";

const BkdSummary = (): JSX.Element => {
  const claimableFees = ScaledNumber.fromUnscaled(1243.34);

  return (
    <SummaryStatistics
      statistics={[
        {
          label: "Claimable platform fees",
          value: claimableFees.toUsdValue(1),
          buttonText: claimableFees.isZero() ? undefined : "Claim",
          buttonAction: () => console.log("todo"),
        },
        {
          label: "Staked BKD",
          value: "312.34 BKD",
          subValue: "$65,530.34",
        },
      ]}
    />
  );
};

export default BkdSummary;
