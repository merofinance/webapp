import React from "react";
import styled from "styled-components";
import Popup from "../../components/Popup";
import GradientText from "../../components/styles/GradientText";
import Tooltip from "../../components/Tooltip";
import { PLACEHOLDER_TOOLTIP } from "../../lib/constants";
import { shortenAddress } from "../../lib/text";
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
  position: PositionType;
};

const NewPositionConfirmation = (props: Props) => {
  return (
    <Popup
      show={props.show}
      close={props.close}
      header="Confirm top-up position"
      confirm
      submit={() => alert("Not implemented yet")}
      content={
        <Content>
          <Summary>
            {`When the collateralization of `}
            <Address
              onClick={() => {
                (window as any)
                  .open(`https://etherscan.io/address/${props.position.borrower}`, "_blank")
                  .focus();
              }}
            >
              {shortenAddress(props.position.borrower, 26)}
            </Address>
            {` drops below ${props.position.threshold}, it will
            be topped up with ${props.position.single} DAI ($3000). This will be repeated each time the
            collateralization ratio drops below ${props.position.threshold}, until a total of ${props.position.total} DAI ($8000) is topped
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
                  (window as any)
                    .open(`https://etherscan.io/address/${props.position.borrower}`, "_blank")
                    .focus();
                }}
              >
                {shortenAddress(props.position.borrower, 8)}
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
              <Label>{props.position.single}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Total top-up
                <Tooltip content={PLACEHOLDER_TOOLTIP} />
              </Label>
              <Label>{props.position.total}</Label>
            </SummaryRow>
          </PositionSummary>
        </Content>
      }
    />
  );
};

export default NewPositionConfirmation;
