import React, { useEffect } from "react";
import styled from "styled-components";
import ContentSection from "../../components/ContentSection";
import NewPosition from "./NewPosition";
import Tooltip from "../../components/Tooltip";
import { Pool } from "../../lib";
import { useDispatch, useSelector } from "react-redux";
import { fetchPositions, selectPoolPositions } from "../../features/positions/positionsSlice";
import { AppDispatch } from "../../app/store";
import { useBackd } from "../../app/hooks/use-backd";
import { Position } from "../../lib/types";
import PositionRow from "./PositionRow";
import PoolStatistics from "./PoolStatistics";

type HeaderType = {
  label: string;
  tooltip: string;
};

const headers: HeaderType[] = [
  {
    label: "Protocol",
    tooltip:
      "The lending protocol on which the user is borrowing funds (currently compatible with Aave and Compound)",
  },
  {
    label: "Address",
    tooltip:
      "The address of the owner of the position to top up (e.g. if Alice is the borrower on Aave that should be topped up then this would be Alice’s address)",
  },
  {
    label: "Threshold",
    tooltip: "The health factor threshold a collateral top up should occur at",
  },
  {
    label: "Single Top Up",
    tooltip: "Amount of a single top up increment (e.g. top up increments of 2,500 DAI)",
  },
  {
    label: "Max Top Up",
    tooltip: "Maximum top up amount (value of your liquidity allocated for top ups)",
  },
];

const StyledPositions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Headers = styled.div`
  width: 100%;
  display: flex;
  padding: 0 2rem;
  margin-bottom: 0.2rem;
`;

const Header = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
`;

type Props = {
  pool: Pool;
};

const PoolPositions = ({ pool }: Props) => {
  const positions = useSelector(selectPoolPositions(pool));
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchPositions({ backd }));
  }, [backd, dispatch, pool]);

  return (
    <ContentSection
      header="Top-up positions"
      statistics={<PoolStatistics pool={pool} />}
      content={
        <StyledPositions>
          <Headers>
            {headers.map((header: HeaderType) => (
              <Header key={header.label}>
                <HeaderText>{header.label}</HeaderText> <Tooltip content={header.tooltip} />
              </Header>
            ))}
            <Header></Header>
          </Headers>
          <NewPosition pool={pool} />
          {positions.map((position: Position, index: number) => (
            <PositionRow key={index} position={position} pool={pool} />
          ))}
        </StyledPositions>
      }
    />
  );
};

export default PoolPositions;
