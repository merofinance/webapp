import React from "react";
import styled from "styled-components";
import Asset from "../../components/Asset";
import Button from "../../components/Button";

const StyledClaimRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.6rem;

  transition: background-color 0.3s;
  :hover {
    background-color: rgba(21, 14, 59, 1);
  }
`;

const Label = styled.div`
  flex: 1;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.7rem;
  letter-spacing: 0.15px;
`;

const ValueContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const EndContainer = styled.div`
  flex: 1.8;
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 1.8rem;
  }

  button:last-child {
    margin-right: 6rem;
  }
`;

const ClaimRow = () => {
  return (
    <StyledClaimRow>
      <Label>ETH pool</Label>
      <ValueContainer>
        <Asset
          token={{
            address: "skdfj",
            name: "DAI",
            symbol: "DAI",
            decimals: 16,
          }}
          small
        />
      </ValueContainer>
      <EndContainer>
        <Button text="Claim" background="#10092f" />
        <Button primary text="Claim & Stake" />
      </EndContainer>
    </StyledClaimRow>
  );
};

export default ClaimRow;
