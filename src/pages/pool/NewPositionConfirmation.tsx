import React from "react";
import styled from "styled-components";
import Popup from "../../components/Popup";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Props = {
  show: boolean;
  close: () => void;
};

const NewPositionConfirmation = (props: Props) => {
  return (
    <Popup
      show={props.show}
      close={props.close}
      header="Confirm top-up position"
      content={<Content>meow</Content>}
    />
  );
};

export default NewPositionConfirmation;
