import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Lending } from "../../../state/lendingSlice";
import { selectEthPrice } from "../../../state/poolsListSlice";

const LendingData = styled.div`
  border: solid 1px red;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
`;

const Header = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Item = styled.div`
  font-size: 1.6rem;
`;

interface Props {
  protocol: string;
  lending?: Lending;
}

const LendingCard = ({ protocol, lending }: Props): JSX.Element => {
  const ethPrice = useSelector(selectEthPrice);

  if (!lending || !lending.totalCollateralETH.toUsdValue) return <Item>meow</Item>; // TODO Make this a sceleton UI

  return (
    <LendingData>
      <Header>{protocol}</Header>
      <Item>{`Total Collateral: ${lending.totalCollateralETH.toUsdValue(ethPrice)}`}</Item>
      <Item>{`Total Debt: ${lending.totalDebtETH.toUsdValue(ethPrice)}`}</Item>
      <Item>{`Avialable to Borrow: ${lending.availableBorrowsETH.toUsdValue(ethPrice)}`}</Item>
      <Item>{`Liquidation Threshold: ${lending.currentLiquidationThreshold.toCryptoString()}`}</Item>
      <Item>{`Health Factor: ${lending.healthFactor.toCryptoString()}`}</Item>
    </LendingData>
  );
};

export default LendingCard;
