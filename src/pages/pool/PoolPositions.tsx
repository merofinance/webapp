import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import ContentSection from "../../components/ContentSection";
import NewPosition from "./NewPosition";
import Tooltip from "../../components/Tooltip";
import { Pool } from "../../lib";
import { fetchPositions, selectPoolPositions } from "../../state/positionsSlice";
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
    left: -1.6rem;
  }
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

  @media (min-width: 1440px) {
    > div:last-child {
      min-width: 14rem;
    }
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

interface ScrollShadowProps {
  show: boolean;
}

const ScrollShadow = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  background-color: #10082f;
  filter: blur(5px);
  width: 20px;
  transform: translate(50%, -50%);
  height: 90%;

  transition: opacity 0.3s;
  opacity: ${(props: ScrollShadowProps) => (props.show ? 1 : 0)};
`;

type Props = {
  pool: Pool;
};

const PoolPositions = ({ pool }: Props): JSX.Element => {
  const positions = useSelector(selectPoolPositions(pool));
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const [showShadow, setShowShadow] = useState(true);
  const positionContentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setShowShadow(
      (positionContentRef.current?.getBoundingClientRect().right || 1000) > window.innerWidth
    );
  };

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchPositions({ backd }));
  }, [backd, dispatch, pool]);

  return (
    <ContentSection
      header={`Top-up ${pool.underlying.symbol} positions`}
      statistics={<PoolStatistics pool={pool} />}
      content={
        <>
          <StyledPositions onScroll={handleScroll}>
            <PositionContent ref={positionContentRef}>
              <Headers>
                {headers.map((header: HeaderType) => (
                  <Header key={header.label}>
                    <HeaderText>{header.label}</HeaderText> <Tooltip content={header.tooltip} />
                  </Header>
                ))}
                <Header />
              </Headers>
              <NewPosition pool={pool} />
              {positions.map((position: Position, index: number) => (
                <PositionRow key={index} position={position} pool={pool} />
              ))}
            </PositionContent>
          </StyledPositions>
          <ScrollShadow show={showShadow} />
        </>
      }
    />
  );
};

export default PoolPositions;
