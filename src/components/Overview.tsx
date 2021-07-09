import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectPools, selectPrices } from "../features/pools-list/poolsListSlice";
import { Pool } from "../lib";
import { PLACEHOLDER_TOOLTIP } from "../lib/constants";
import { numberToCompactString } from "../lib/numeric";
import Tooltip from "./Tooltip";

const StyledOverview = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.8rem;
  background-color: rgba(37, 33, 64, 0.4);
  border-radius: 1.4rem;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  margin-left: 1.6rem;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 2.4rem;
  letter-spacing: 0.25px;
  margin-bottom: 0.6rem;
`;

const StatisticContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.4rem;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
`;

const Value = styled.div`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
  color: var(--sub);
`;

type Props = {
  pool?: Pool;
};

const Overview = ({ pool }: Props) => {
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);

  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;

  const locked = pool
    ? pool.totalAssets * getPrice(pool)
    : pools.reduce((a: number, b: Pool) => a + b.totalAssets * getPrice(b), 0);

  const averageApy = pool
    ? pool.apy
    : pools.reduce((a: number, b: Pool) => a + b.apy, 0) / pools.length;

  return (
    <div>
      <StyledOverview>
        <Header>{pool ? "Pool Overview" : "Pools Overview"}</Header>
        <StatisticContainer>
          <LabelContainer>
            <Label>{pool ? "Pool TVL" : "Platform TVL"}</Label>
            <Tooltip content={PLACEHOLDER_TOOLTIP} />
          </LabelContainer>
          <Value>{numberToCompactString(locked)}</Value>
        </StatisticContainer>
        <StatisticContainer>
          <LabelContainer>
            <Label>{pool ? "APY" : "Average APY"}</Label>
            <Tooltip content={PLACEHOLDER_TOOLTIP} />
          </LabelContainer>
          <Value>{`${averageApy.toLocaleString()}%`}</Value>
        </StatisticContainer>
        <StatisticContainer>
          <LabelContainer>
            <Label>{pool ? "Strategy" : "Revenue"}</Label>
            <Tooltip content={PLACEHOLDER_TOOLTIP} />
          </LabelContainer>
          <Value>{pool ? pool.name : numberToCompactString(0)}</Value>
        </StatisticContainer>
      </StyledOverview>
    </div>
  );
};

export default Overview;
