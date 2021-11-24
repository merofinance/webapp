import styled from "styled-components";
import eth from "../assets/tokens/eth.png";
import usdc from "../assets/tokens/usdc.png";
import dai from "../assets/tokens/dai.png";
import { Token } from "../lib/types";
import { numberToCompactString } from "../lib/numeric";

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
  align-items: center;
`;

interface IconProps {
  large?: boolean;
  tiny?: boolean;
}

const Icon = styled.img`
  height: ${(props: IconProps) => (props.tiny ? "1.8rem" : props.large ? "3.4rem" : "2.4rem")};

  margin-right: ${(props: IconProps) => (props.tiny ? "0.6rem" : "1.2rem")};
  @media (max-width: 600px) {
    margin-right: ${(props: IconProps) => (props.tiny ? "0.6rem" : "1rem")};
  }
`;

interface LabelProps {
  large?: boolean;
  small?: boolean;
  tiny?: boolean;
}

const Label = styled.div`
  font-weight: ${(props: LabelProps) => (props.small ? "500" : "700")};
  letter-spacing: ${(props: LabelProps) =>
    props.tiny ? "0.46px" : props.large ? "0.25px" : "0.15px"};
  white-space: nowrap;

  font-size: ${(props: LabelProps) =>
    props.tiny ? "1.5rem" : props.large ? "2.4rem" : props.small ? "1.8rem" : "1.6rem"};
  @media (max-width: 600px) {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

type Props = {
  token: Token;
  large?: boolean;
  small?: boolean;
  tiny?: boolean;
  value?: number;
  hideIcon?: boolean;
  compact?: boolean;
};

const Asset = ({ token, large, small, tiny, value, hideIcon, compact }: Props): JSX.Element => {
  return (
    <StyledAsset>
      {!hideIcon && <Icon src={assets[token.symbol]} alt={`${token.symbol} icon`} tiny={tiny} />}
      <Label large={large} small={small} tiny={tiny}>{`${
        value ? `${compact ? numberToCompactString(value) : value} ` : ""
      }${token.symbol}`}</Label>
    </StyledAsset>
  );
};

export default Asset;
