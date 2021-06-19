import React from "react";
import Overview from "../../components/Overview";

type Props = {
  pool: string;
};

const PoolOverview = (props: Props) => {
  return (
    <Overview
      header="Pool Overview"
      statistics={[
        {
          header: "Pool TVL",
          value: "$135m",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
        {
          header: "APY",
          value: "12.3%",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
        {
          header: "Strategy",
          value: "3CRV",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
      ]}
    />
  );
};

export default PoolOverview;
