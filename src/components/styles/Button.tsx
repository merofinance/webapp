import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

type ButtonProps = {
  hero?: boolean;
  large?: boolean;
  square?: boolean;
  loading?: boolean;
};

const StyledButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    270deg,
    var(--primary-gradient) 0%,
    var(--secondary-gradient) 50%,
    var(--primary-gradient) 100%
  );
  cursor: pointer;
  transition: 0.5s;
  background-size: 200% auto;

  :hover {
    background-position: right center;
  }

  height: ${(props: ButtonProps) => {
    if (props.large) return "6.2rem";
    if (props.square) return "5.6rem";
    return "3.8rem";
  }};
  border-radius: ${(props: ButtonProps) => {
    if (props.large) return "3.1rem";
    if (props.square) return "1.4rem";
    return "1.9rem";
  }};
  padding: 0
    ${(props: ButtonProps) => {
      if (props.large) return "5rem";
      if (props.square) return "3rem";
      return "2.6rem";
    }};
  margin-top: ${(props: ButtonProps) => {
    if (props.hero) return "8rem";
    return "0";
  }};

  @media (max-width: 600px) {
    margin-top: ${(props: ButtonProps) => {
      if (props.hero) return "4.5rem";
      return "0";
    }};
    height: ${(props: ButtonProps) => {
      if (props.square) return "5.6rem";
      return "4.8rem";
    }};
    border-radius: ${(props: ButtonProps) => {
      if (props.square) return "1.4rem";
      return "2.4rem";
    }};
    padding: 0
      ${(props: ButtonProps) => {
        if (props.square) return "1.8rem";
        return "5.2rem";
      }};
  }
`;

const Text = styled.div`
  text-transform: capitalize;
  opacity: ${(props: ButtonProps) => (props.loading ? "0" : "1")};

  letter-spacing: ${(props: ButtonProps) => {
    if (props.large) return "0";
    return "0.46px";
  }};
  line-height: ${(props: ButtonProps) => {
    if (props.large) return "2.8rem";
    return "2.6rem";
  }};
  font-size: ${(props: ButtonProps) => {
    if (props.large) return "2.1rem";
    if (props.square) return "1.4rem";
    return "1.5rem";
  }};
  font-weight: ${(props: ButtonProps) => {
    if (props.large) return "700";
    if (props.square) return "700";
    return "500";
  }};

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const ProgressContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  text: string;
  click: () => void;
  hero?: boolean;
  large?: boolean;
  square?: boolean;
  loading?: boolean;
};

const Button = (props: Props) => {
  return (
    <StyledButton
      onClick={() => {
        if (!props.loading) props.click();
      }}
      hero={props.hero}
      large={props.large}
      square={props.square}
    >
      {props.loading && (
        <ProgressContainer>
          <CircularProgress size={props.large ? 31 : 25} />
        </ProgressContainer>
      )}
      <Text hero={props.hero} large={props.large} square={props.square} loading={props.loading}>
        {props.text}
      </Text>
    </StyledButton>
  );
};

export default Button;
