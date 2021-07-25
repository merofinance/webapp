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
  position: relative;
  width: 100%;

  @media (max-width: 600px) {
    width: calc(100% + 3.2rem);
    overflow-x: auto;
    transform: translateX(-1.6rem);
  }
`;

const ScrollShadow = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  background-color: #10082f;
  filter: blur(5px);
  width: 20px;
  transform: translate(50%, -50%);
  height: 90%;
`;

const PositionContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 720px;
    overflow-x: auto;
  }
`;

const Headers = styled.div`
  width: 100%;
  display: flex;
  padding: 0 2rem;
  white-space: nowrap;

  margin-bottom: 0.2rem;
  @media (max-width: 600px) {
    margin-bottom: 0;
  }
`;

const Header = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;

  font-weight: 500;
  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-weight: 700;
    font-size: 1.2rem;
  }
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
        <>
          <StyledPositions>
            <PositionContent>
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
            </PositionContent>
          </StyledPositions>
          <ScrollShadow />
        </>
      }
    />
  );
};

export default PoolPositions;
