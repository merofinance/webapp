import React from "react";
import styled from "styled-components";
import { Lending } from "../../../state/lendingSlice";

const LendingData = styled.div`
  border: solid 1px red;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
`;

interface Props {
  lending?: Lending;
}

const LendingCard = ({ lending }: Props): JSX.Element => {
  if (!lending) return <div>meow</div>; // TODO Make this a sceleton UI

  return (
    <LendingData>
      <div>Aave</div>
      <div>{`Total Collateral: ${lending?.totalCollateral}`}</div>
      <div>{`Total Debt: ${lending?.totalDebt}`}</div>
      <div>{`Avialable to Borrow: ${lending?.availableBorrows}`}</div>
      <div>{`Liquidation Threshold: ${lending?.currentLiquidationThreshold}`}</div>
      <div>{`Health Factor: ${lending?.healthFactor}`}</div>
    </LendingData>
  );
};

export default LendingCard;
