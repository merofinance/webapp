import React from "react";
import styled from "styled-components";
import eth from "../assets/tokens/eth.png";
import usdc from "../assets/tokens/usdc.png";
import dai from "../assets/tokens/dai.png";

export enum AssetType {
  ETH,
  USDC,
  DAI,
}

type AssetDetailsType = {
  asset: AssetType;
  label: string;
  icon: string;
};

const assetDetails: AssetDetailsType[] = [
  {
    asset: AssetType.ETH,
    label: "ETH",
    icon: eth,
  },
  {
    asset: AssetType.USDC,
    label: "USDC",
    icon: usdc,
  },
  {
    asset: AssetType.DAI,
    label: "DAI",
    icon: dai,
  },
];

const StyledAsset = styled.div`
  display: flex;
`;

const Icon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

const Label = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-left: 1.2rem;
`;

type Props = {
  asset: AssetType;
};

const Asset = (props: Props) => {
  const detail = assetDetails.filter((ad: AssetDetailsType) => ad.asset === props.asset)[0];

  return (
    <StyledAsset>
      <Icon src={detail.icon} />
      <Label>{detail.label}</Label>
    </StyledAsset>
  );
};

export default Asset;
