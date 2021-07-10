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

const Icon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const Label = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.15px;

  line-height: 2.4rem;
  font-size: 1.6rem;
  margin-left: 1.2rem;
  font-weight: 700;
  @media (max-width: 600px) {
    margin-left: 1rem;
    font-size: 1.4rem;
    line-height: 2.1rem;
    font-weight: 400;
  }
`;

type Props = {
  token: Token;
};

const Asset = ({ token }: Props) => {
  return (
    <StyledAsset>
      <Icon src={assets[token.symbol]} alt={`${token.symbol} icon`} />
      <Label>{token.symbol.toUpperCase()}</Label>
    </StyledAsset>
  );
};

export default Asset;
