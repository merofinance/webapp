import React from "react";
import styled from "styled-components";
import AmountInput from "../../components/AmountInput";
import ContentSection from "../../components/ContentSection";
import ProgressButtons from "../../components/ProgressButtons";
import { Pool } from "../../lib";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Props = {
  pool: Pool;
};

const PoolWithdraw = (props: Props) => {
  return (
    <ContentSection
      header={`Withdraw ${props.pool.underlying.symbol.toUpperCase()}`}
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
      content={
        <Content>
          <AmountInput label="Enter an amount of USDC to withdraw" max={100} />
          <ProgressButtons token={""} symbol={"dai"} buttonText="Deposit and Stake" />
        </Content>
      }
    />
  );
};

export default PoolWithdraw;
