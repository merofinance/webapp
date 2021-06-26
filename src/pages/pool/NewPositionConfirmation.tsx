import React from "react";
import styled from "styled-components";
import Popup from "../../components/Popup";
import GradientText from "../../components/styles/GradientText";
import { PositionType } from "./PoolPositions";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Summary = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
`;

const Address = styled(GradientText)`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
`;

type Props = {
  show: boolean;
  close: () => void;
  position: PositionType;
};

const NewPositionConfirmation = (props: Props) => {
  return (
    <Popup
      show={props.show}
      close={props.close}
      header="Confirm top-up position"
      content={
        <Content>
          <Summary>
            {`When the collateralization of ${props.position.borrower} drops below ${props.position.threshold}, it will
            be topped up with ${props.position.single} DAI ($3000). This will be repeated each time the
            collateralization ratio drops below ${props.position.threshold}, until a total of ${props.position.total} DAI ($8000) is topped
            up.`}
          </Summary>
        </Content>
      }
    />
  );
};

export default NewPositionConfirmation;
