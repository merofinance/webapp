import styled from "styled-components";
import { Token } from "../lib/types";
import poolMetadata from "../lib/data/pool-metadata";

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

interface Props {
  token: Token;
  large?: boolean;
  small?: boolean;
  tiny?: boolean;
  value?: string;
  hideIcon?: boolean;
}

const Asset = ({ token, large, small, tiny, value, hideIcon }: Props): JSX.Element => {
  const { icon } = poolMetadata[token.symbol];

  return (
    <StyledAsset>
      {!hideIcon && <Icon src={icon} alt={`${token.symbol} icon`} tiny={tiny} />}
      <Label large={large} small={small} tiny={tiny}>{`${value || ""}${token.symbol}`}</Label>
    </StyledAsset>
  );
};

export default Asset;
