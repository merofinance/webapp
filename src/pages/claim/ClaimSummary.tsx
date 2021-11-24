import SummaryStatistics from "../../components/SummaryStatistics";

const ClaimSummary = (): JSX.Element => {
  return (
    <SummaryStatistics
      statistics={[
        {
          label: "claim.overview.claimable",
          value: "$1,243.34",
        },
        {
          label: "claim.overview.deposits",
          value: "$65,530.34",
        },
      ]}
    />
  );
};

export default ClaimSummary;
