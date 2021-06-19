import React from "react";
import styled from "styled-components";
import ContentSection from "../../components/ContentSection";

type Props = {
  token: string;
};

const PoolDeposit = (props: Props) => {
  return (
    <ContentSection
      header={`Deposit ${props.token.toUpperCase()}`}
      statistics={[
        {
          header: "Your deposits",
          value: "$130,000.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
        {
          header: "Locked in position",
          value: "$90,000.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
        {
          header: "Rewards accrued",
          value: "$14,000.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
      ]}
      content={<p>deposit</p>}
    />
  );
};

export default PoolDeposit;
