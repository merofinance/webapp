import React from "react";
import styled from "styled-components";
import eth from "../assets/tokens/eth.png";
import usdc from "../assets/tokens/usdc.png";
import dai from "../assets/tokens/dai.png";

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
  asset: "eth" | "usdc" | "dai";
};

const Asset = (props: Props) => {
  const icon = () => {
    if (props.asset === "eth") return eth;
    if (props.asset === "usdc") return usdc;
    if (props.asset === "dai") return dai;
  };

  return (
    <StyledAsset>
      <Icon src={icon()} alt={`${props.asset} icon`} />
      <Label>{props.asset}</Label>
    </StyledAsset>
  );
};

export default Asset;
