import React from "react";
import styled from "styled-components";
import eth from "../assets/tokens/eth.png";
import usdc from "../assets/tokens/usdc.png";
import dai from "../assets/tokens/dai.png";
import { Token } from "../lib/types";

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
  width: ${(props: IconProps) => (props.large ? "3.4rem" : "2.4rem")};
  height: ${(props: IconProps) => (props.large ? "3.4rem" : "2.4rem")};
`;

interface LabelProps {
  large?: boolean;
  small?: boolean;
}

const Label = styled.div`
  text-transform: uppercase;
  font-weight: ${(props: LabelProps) => (props.small ? "500" : "700")};
  font-size: ${(props: LabelProps) => (props.large ? "2.4rem" : props.small ? "1.8rem" : "1.6rem")};
  line-height: 2.4rem;
  letter-spacing: ${(props: LabelProps) => (props.large ? "0.25px" : "0.15px")};
  margin-left: 1.2rem;
`;

type Props = {
  token: Token;
  large?: boolean;
  small?: boolean;
  value?: number;
};

const Asset = ({ token, large, small, value }: Props) => {
  return (
    <StyledAsset>
      <Icon src={assets[token.symbol]} alt={`${token.symbol} icon`} />
      <Label large={large} small={small}>{`${value ? `${value} ` : ""}${token.symbol}`}</Label>
    </StyledAsset>
  );
};

export default Asset;
