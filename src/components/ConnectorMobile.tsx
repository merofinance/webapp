import { useWeb3React } from "@web3-react/core";
import React from "react";
import styled from "styled-components";
import PulsingDot from "./PulsingDot";

const MobileConnector = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px var(--subtle);
  border-radius: 7px;

  @media (min-width: 716px) {
    display: none;
  }
`;

interface Props {
  connect: () => void;
}

const ConnectorMobile = ({ connect }: Props): JSX.Element => {
  const { active } = useWeb3React();

  return (
    <MobileConnector onClick={() => connect()}>
      <PulsingDot success={active} error={!active} />
    </MobileConnector>
  );
};

export default ConnectorMobile;
