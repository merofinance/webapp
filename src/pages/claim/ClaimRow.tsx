import React from "react";
import styled from "styled-components";
import { useDevice } from "../../app/hooks/use-device";
import Asset from "../../components/Asset";
import Button from "../../components/Button";
import SplitButton from "../../components/SplitButton";
import { numberToCompactCurrency } from "../../lib/numeric";

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

const ClaimRow = ({ index }: Props): JSX.Element => {
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
          value={18300000}
          small
          compact
        />
        <ValueUsd>{`=${numberToCompactCurrency(18300000)}`}</ValueUsd>
      </ValueContainer>
      <EndContainer>
        {isDesktop && (
          <>
            <Button web3 text="Claim" background="#100830" width="12rem" primary={isMobile} />
            <Button web3 primary text="Claim & Stake" width={isMobile ? "auto" : "18rem"} />
          </>
        )}
        {isMobile && (
          <SplitButton
            buttons={[
              {
                value: "claim-and-stake",
                label: "Claim & Stake",
                action: () => console.log("not implemented"),
              },
              {
                value: "claim",
                label: "Claim",
                action: () => console.log("not implemented"),
              },
            ]}
          />
        )}
      </EndContainer>
    </StyledClaimRow>
  );
};

export default ClaimRow;
