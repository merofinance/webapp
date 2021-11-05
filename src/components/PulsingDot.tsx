import React from "react";
import styled from "styled-components";

const DotContainer = styled.div`
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotAura = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props: Props) =>
    props.success ? "var(--success)" : props.error ? "var(--error)" : "var(--neutral)"};
  border-radius: 50%;
  opacity: 0.3;
  transform: scale(1);
`;

const DotCenter = styled.div`
  width: 0.6rem;
  height: 0.6rem;
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
      <DotCenter id="connector-network-dot" success={success} error={error} />
    </DotContainer>
  );
};

export default PulsingDot;
