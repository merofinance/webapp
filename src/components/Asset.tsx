import React from "react";
import styled from "styled-components";
import eth from "../assets/tokens/eth.png";
import usdc from "../assets/tokens/usdc.png";
import dai from "../assets/tokens/dai.png";
import { Token } from "../lib/types";

const StyledAsset = styled.div`
  display: flex;
`;

const Icon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const Label = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-left: 1.2rem;
`;

type Props = {
  token: Token;
};

const Asset = ({ token }: Props) => {
  const icon = () => {
    if (token.symbol.toLowerCase() === "eth") return eth;
    if (token.symbol.toLowerCase() === "usdc") return usdc;
    if (token.symbol.toLowerCase() === "dai") return dai;
  };

  return (
    <StyledAsset>
      <Icon src={icon()} alt={`${token.symbol} icon`} />
      <Label>{token.symbol.toUpperCase()}</Label>
    </StyledAsset>
  );
};

export default Asset;
