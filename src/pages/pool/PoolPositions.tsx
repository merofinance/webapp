import React from "react";
import styled from "styled-components";
import ContentSection from "../../components/ContentSection";
import DeleteIcon from "@material-ui/icons/Delete";

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
`;

const Value = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
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
        <StyledPositions>
          <Headers>
            <Header>Protocol</Header>
            <Header>Borrower</Header>
            <Header>Threshold</Header>
            <Header>Single topup</Header>
            <Header>Total topup</Header>
            <Header></Header>
          </Headers>
          <Position>
            <Value>Compound</Value>
            <Value>0xf76...5255</Value>
            <Value>1.03</Value>
            <Value>3,000 DAI</Value>
            <Value>8,000 DAI</Value>
            <Value>
              <DeleteIcon style={{ fontSize: 18 }} />
            </Value>
          </Position>
        </StyledPositions>
      }
    />
  );
};

export default PoolPositions;
