import React from "react";
import styled from "styled-components";
import Popup from "./Popup";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  show: boolean;
  close: () => void;
}

const ConnectionDetails = ({ show, close }: Props) => {
  return (
    <Popup small show={show} close={close} header="account" content={<Content>meow</Content>} />
  );
};

export default ConnectionDetails;
