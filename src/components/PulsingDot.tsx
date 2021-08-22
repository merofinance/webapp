import React from "react";
import styled, { keyframes } from "styled-components";

const DotContainer = styled.div`
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.7);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(0.7);
    opacity: 0;
  }
`;

const DotAura = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props: Props) =>
    props.success ? "var(--success)" : props.error ? "var(--error)" : "var(--neutral)"};
  border-radius: 50%;
  animation: ${pulseAnimation} 2s infinite; ;
`;

const DotCenter = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props: Props) =>
    props.success ? "var(--success)" : props.error ? "var(--error)" : "var(--neutral)"};
`;

interface Props {
  success?: boolean;
  error?: boolean;
}

const PulsingDot = ({ success, error }: Props): JSX.Element => {
  return (
    <DotContainer>
      <DotAura success={success} error={error} />
      <DotCenter success={success} error={error} />
    </DotContainer>
  );
};

export default PulsingDot;
