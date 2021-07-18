import React from "react";
import SummaryStatistics from "../../components/SummaryStatistics";

const StakeSummary = () => {
  return (
    <SummaryStatistics
      statistics={[
        {
          label: "claimable",
          value: "$1,243.34",
        },
        {
          label: "your total deposits",
          value: "$65,530.34",
        },
      ]}
    />
  );
};

export default StakeSummary;
