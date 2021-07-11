import React from "react";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import SummaryStatistics from "../../components/SummaryStatistics";

const StakeSummary = () => {
  return (
    <SummaryStatistics
      statistics={[
        {
          label: "claimable",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: "$1,243.34",
        },
        {
          label: "your deposits",
          tooltip: PLACEHOLDER_TOOLTIP,
          value: "$65,530.34",
        },
      ]}
    />
  );
};

export default StakeSummary;
