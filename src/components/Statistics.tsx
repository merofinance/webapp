import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectPools, selectPrices } from "../features/pools-list/poolsListSlice";
import { selectBalances } from "../features/user/userSlice";
import { Pool } from "../lib";
import Statistic from "./Statistic";

const StyledStatistics = styled.div`
  width: 100%;
  display: flex;
  padding: 2.2rem 1.6rem;
  padding-bottom: 2.6rem;
`;

type Props = {
  pool?: Pool;
};

const Statistics = ({ pool }: Props) => {
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);
  const balances = useSelector(selectBalances);

  const getBalance = (pool: Pool) => balances[pool.lpToken.address] || 0;
  const getPrice = (pool: Pool) => prices[pool.underlying.symbol] || 0;

  const deposits = pool
    ? getBalance(pool) * getPrice(pool)
    : pools.reduce((a: number, b: Pool) => a + getBalance(b) * getPrice(b), 0);

  const locked = pool
    ? pool.totalAssets * getPrice(pool)
    : pools.reduce((a: number, b: Pool) => a + b.totalAssets * getPrice(b), 0);

  return (
    <StyledStatistics>
      <Statistic
        statistic={{
          header: "Your deposits",
          value: `$${deposits.toLocaleString()}`,
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        }}
      />
      <Statistic
        statistic={{
          header: "Locked in position",
          value: `$${locked.toLocaleString()}`,
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        }}
      />
      <Statistic
        statistic={{
          header: "Rewards accrued",
          value: "$0.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        }}
      />
    </StyledStatistics>
  );
};

export default Statistics;
