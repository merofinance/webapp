import React from "react";
import styled from "styled-components";
import eth from "../assets/tokens/eth.png";
import usdc from "../assets/tokens/usdc.png";
import dai from "../assets/tokens/dai.png";
import { Token } from "../lib/types";
import { numberToCompact } from "../lib/numeric";

type AssetType = {
  [key: string]: string;
};

const assets: AssetType = {
  ETH: eth,
  USDC: usdc,
  DAI: dai,
};

const StyledAsset = styled.div`
  display: flex;
`;

interface IconProps {
  large?: boolean;
}

const Icon = styled.img`
  height: ${(props: IconProps) => (props.large ? "3.4rem" : "2.4rem")};

  margin-right: 1.2rem;
  @media (max-width: 600px) {
    margin-right: 1rem;
  }
`;

interface LabelProps {
  large?: boolean;
  small?: boolean;
}

const Label = styled.div`
  font-weight: ${(props: LabelProps) => (props.small ? "500" : "700")};
  letter-spacing: ${(props: LabelProps) => (props.large ? "0.25px" : "0.15px")};
  white-space: nowrap;

  font-size: ${(props: LabelProps) => (props.large ? "2.4rem" : props.small ? "1.8rem" : "1.6rem")};
  line-height: 2.4rem;
  font-weight: 700;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    line-height: 2.1rem;
    font-weight: 400;
  }
`;

type Props = {
  token: Token;
  large?: boolean;
  small?: boolean;
  value?: number;
  hideIcon?: boolean;
  compact?: boolean;
};

const Asset = ({ token, large, small, value, hideIcon, compact }: Props) => {
  return (
    <StyledAsset>
      {!hideIcon && <Icon src={assets[token.symbol]} alt={`${token.symbol} icon`} />}
      <Label large={large} small={small}>{`${
        value ? `${compact ? numberToCompact(value) : value} ` : ""
      }${token.symbol}`}</Label>
    </StyledAsset>
  );
};

export default Asset;
