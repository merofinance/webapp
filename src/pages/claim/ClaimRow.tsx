import React from "react";
import styled from "styled-components";
import Asset from "../../components/Asset";
import Button from "../../components/Button";

interface ClaimRowProps {
  index: number;
}

const StyledClaimRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.6rem;

  background-color: ${(props: ClaimRowProps) =>
    props.index % 2 === 0 ? "none" : "rgba(21, 14, 59, 1)"};
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

const ValueUsd = styled.div`
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
  margin-left: 1.3rem;
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

interface Props {
  index: number;
}

const ClaimRow = ({ index }: Props) => {
  return (
    <StyledClaimRow index={index}>
      <Label>ETH pool</Label>
      <ValueContainer>
        <Asset
          token={{
            address: "skdfj",
            name: "DAI",
            symbol: "DAI",
            decimals: 16,
          }}
          value={18}
          small
        />
        <ValueUsd>=$120.00</ValueUsd>
      </ValueContainer>
      <EndContainer>
        <Button text="Claim" background="#100830" width="12rem" />
        <Button primary text="Claim & Stake" width="18rem" />
      </EndContainer>
    </StyledClaimRow>
  );
};

export default ClaimRow;
