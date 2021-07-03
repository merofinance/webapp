import React, { useEffect } from "react";
import styled from "styled-components";
import ContentSection from "../../components/ContentSection";
import NewPosition from "./NewPosition";
import Tooltip from "../../components/Tooltip";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import { Pool } from "../../lib";
import { useDispatch, useSelector } from "react-redux";
import { fetchPositions, selectPositions } from "../../features/positions/positionsSlice";
import { AppDispatch } from "../../app/store";
import { useBackd } from "../../app/hooks/use-backd";
import { Position } from "../../lib/types";
import PositionRow from "./PositionRow";

type HeaderType = {
  label: string;
  tooltip: string;
};

const headers: HeaderType[] = [
  {
    label: "Protocol",
    tooltip: PLACEHOLDER_TOOLTIP,
  },
  {
    label: "Borrower",
    tooltip: PLACEHOLDER_TOOLTIP,
  },
  {
    label: "Threshold",
    tooltip: PLACEHOLDER_TOOLTIP,
  },
  {
    label: "Single topup",
    tooltip: PLACEHOLDER_TOOLTIP,
  },
  {
    label: "Total topup",
    tooltip: PLACEHOLDER_TOOLTIP,
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
  const positions = useSelector(selectPositions(pool));
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchPositions({ backd }));
  }, [backd, dispatch, pool]);

  return (
    <ContentSection
      header="Top-up positions"
      pool={pool}
      content={
        <StyledPositions>
          <Headers>
            {headers.map((header: HeaderType) => (
              <Header>
                <HeaderText>{header.label}</HeaderText> <Tooltip content={header.tooltip} />
              </Header>
            ))}
            <Header></Header>
          </Headers>
          <NewPosition pool={pool} />
          {positions.map((position: Position) => (
            <PositionRow position={position} pool={pool} />
          ))}
        </StyledPositions>
      }
    />
  );
};

export default PoolPositions;
