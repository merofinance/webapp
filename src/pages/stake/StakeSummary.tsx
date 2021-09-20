import React from "react";
import SummaryStatistics from "../../components/SummaryStatistics";

const StakeSummary = (): JSX.Element => {
  return (
    <SummaryStatistics
      statistics={[
        {
          label: "stake.overview.claimable",
          value: "$1,243.34",
        },
        {
          label: "stake.overview.deposits",
          value: "$65,530.34",
        },
      ]}
    />
  );
};

export default StakeSummary;
