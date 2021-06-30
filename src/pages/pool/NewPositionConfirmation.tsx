import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useBackd } from "../../app/hooks/use-backd";
import Popup from "../../components/Popup";
import GradientText from "../../components/styles/GradientText";
import Tooltip from "../../components/Tooltip";
import { registerPosition } from "../../features/positions/positionsSlice";
import { openAndFocusWindow } from "../../lib/browser";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import { shortenAddress } from "../../lib/text";
import { Pool, Position } from "../../lib/types";

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
  cursor: pointer;
`;

const PositionSummary = styled.div`
  margin-top: 4.8rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(60, 60, 60, 0.5);
  border-radius: 1.4rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
`;

const SummaryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.6rem 0;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.8rem;
  letter-spacing: 0.15px;
  text-transform: capitalize;
`;

const AddressLabel = styled(GradientText)`
  font-weight: 500;
  font-size: 1.8rem;
  letter-spacing: 0.15px;
  cursor: pointer;
`;

type Props = {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
};

const NewPositionConfirmation = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const backd = useBackd();

  const executeRegister = () => {
    if (!backd) return;
    dispatch(registerPosition({ position: props.position, pool: props.pool, backd }));
  };

  return (
    <Popup
      show={props.show}
      close={props.close}
      header="Confirm top-up position"
      confirm
      submit={() => executeRegister()}
      content={
        <Content>
          <Summary>
            {`When the collateralization of `}
            <Address
              onClick={() => {
                openAndFocusWindow(
                  `https://etherscan.io/address/${props.position.account}`,
                  "_blank"
                );
              }}
            >
              {shortenAddress(props.position.account, 26)}
            </Address>
            {` drops below ${props.position.threshold}, it will
            be topped up with ${props.position.singleTopUp} DAI ($3000). This will be repeated each time the
            collateralization ratio drops below ${props.position.threshold}, until a total of ${props.position.totalTopUp} DAI ($8000) is topped
            up.`}
          </Summary>
          <PositionSummary>
            <SummaryRow>
              <Label>
                Protocol <Tooltip content={PLACEHOLDER_TOOLTIP} />
              </Label>
              <Label>{props.position.protocol}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Borrower
                <Tooltip content={PLACEHOLDER_TOOLTIP} />
              </Label>
              <AddressLabel
                onClick={() => {
                  openAndFocusWindow(
                    `https://etherscan.io/address/${props.position.account}`,
                    "_blank"
                  );
                }}
              >
                {shortenAddress(props.position.account, 8)}
              </AddressLabel>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Threshold
                <Tooltip content={PLACEHOLDER_TOOLTIP} />
              </Label>
              <Label>{props.position.threshold}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Singe top-up
                <Tooltip content={PLACEHOLDER_TOOLTIP} />
              </Label>
              <Label>{props.position.singleTopUp}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Total top-up
                <Tooltip content={PLACEHOLDER_TOOLTIP} />
              </Label>
              <Label>{props.position.totalTopUp}</Label>
            </SummaryRow>
          </PositionSummary>
        </Content>
      }
    />
  );
};

export default NewPositionConfirmation;
