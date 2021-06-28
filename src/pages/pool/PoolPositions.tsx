import React from "react";
import styled from "styled-components";
import ContentSection from "../../components/ContentSection";
import deleteIcon from "../../assets/ui/delete.svg";
import NewPosition from "./NewPosition";
import Tooltip from "../../components/Tooltip";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";

export type PositionType = {
  protocol: string;
  borrower: string;
  threshold: number;
  single: number;
  total: number;
};

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

const Position = styled.div`
  width: 100%;
  display: flex;
  background: #2c2846;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 1.2rem;
  padding: 1.7rem 2rem;
  margin-top: 0.6rem;

  > div:last-child {
    justify-content: flex-end;
  }
`;

const Value = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

const Delete = styled.img`
  height: 1.4rem;
`;

type Props = {
  token: string;
};

const PoolPositions = (props: Props) => {
  return (
    <ContentSection
      header="Top-up positions"
      statistics={[
        {
          header: "Your deposits",
          value: "$130,000.00",
          tooltip: PLACEHOLDER_TOOLTIP,
        },
        {
          header: "Locked in position",
          value: "$90,000.00",
          tooltip: PLACEHOLDER_TOOLTIP,
        },
        {
          header: "Rewards accrued",
          value: "$14,000.00",
          tooltip: PLACEHOLDER_TOOLTIP,
        },
      ]}
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
          <NewPosition />
          <Position>
            <Value>Compound</Value>
            <Value>0xf76...5255</Value>
            <Value>1.03</Value>
            <Value>3,000 DAI</Value>
            <Value>8,000 DAI</Value>
            <Value>
              <DeleteButton>
                <Delete src={deleteIcon} alt="delete button" />
              </DeleteButton>
            </Value>
          </Position>
          <Position>
            <Value>Aave</Value>
            <Value>0xf76...5255</Value>
            <Value>1.03</Value>
            <Value>3,000 DAI</Value>
            <Value>8,000 DAI</Value>
            <Value>
              <DeleteButton>
                <Delete src={deleteIcon} alt="delete button" />
              </DeleteButton>
            </Value>
          </Position>
        </StyledPositions>
      }
    />
  );
};

export default PoolPositions;
