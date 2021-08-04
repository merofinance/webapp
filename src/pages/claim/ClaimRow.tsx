import React, { useState } from "react";
import styled from "styled-components";
import Asset from "../../components/Asset";
import Button from "../../components/Button";
import { useDevice } from "../../lib/hooks";

interface ClaimRowProps {
  index: number;
}

const StyledClaimRow = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.6rem;

  background-color: ${(props: ClaimRowProps) =>
    props.index % 2 === 0 ? "none" : "rgba(21, 14, 59, 1)"};

  @media (max-width: 600px) {
    justify-content: space-between;
  }
`;

const Label = styled.div`
  font-weight: 700;
  line-height: 1.7rem;
  letter-spacing: 0.15px;
  white-space: nowrap;

  @media (min-width: 601px) {
    flex: 1;
  }

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 601px) {
    flex: 2;
  }
`;

const ValueUsd = styled.div`
  font-weight: 400;
  line-height: 2.7rem;
  letter-spacing: 0.15px;
  opacity: 0.6;

  font-size: 1.8rem;
  margin-left: 1.3rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-left: 0.2rem;
  }
`;

const EndContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (min-width: 601px) {
    flex: 1.8;

    button:first-child {
      margin-right: 1.8rem;
    }

    button:last-child {
      margin-right: 6rem;
    }
  }
`;

interface Props {
  index: number;
}

const ClaimRow = ({ index }: Props) => {
  const { isMobile, isDesktop } = useDevice();

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
          hideIcon={isMobile}
          value={18}
          small
        />
        <ValueUsd>=$120.00</ValueUsd>
      </ValueContainer>
      <EndContainer>
        <Button
          text="Claim"
          background="#100830"
          width={isMobile ? "auto" : "12rem"}
          small={isMobile}
          primary={isMobile}
        />
        {isDesktop && <Button primary text="Claim & Stake" width="18rem" />}
      </EndContainer>
    </StyledClaimRow>
  );
};

export default ClaimRow;
