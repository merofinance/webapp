import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import Popup from "../../components/Popup";
import GradientText from "../../styles/GradientText";
import Tooltip from "../../components/Tooltip";
import { setError } from "../../features/error/errorSlice";
import { registerPosition } from "../../features/positions/positionsSlice";
import { openEtherscanAddress } from "../../lib/browser";
import { shortenAddress } from "../../lib/text";
import { Pool, Position } from "../../lib/types";
import { selectPrice } from "../../features/pool/selectors";

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
  complete: () => void;
};

const NewPositionConfirmation = ({ show, close, position, pool, complete }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const price = useSelector(selectPrice(pool));
  const backd = useBackd();

  const [loading, setLoading] = useState(false);

  const executeRegister = () => {
    if (!backd) return;
    setLoading(true);

    dispatch(registerPosition({ position, pool, backd })).then((v: any) => {
      setLoading(false);
      if (v.meta.requestStatus === "rejected")
        dispatch(setError({ error: "Position creation failed" }));
      else {
        complete();
        close();
      }
    });
  };

  return (
    <Popup
      show={show}
      close={close}
      header="Confirm top-up position"
      confirm
      submit={() => executeRegister()}
      loading={loading}
      content={
        <Content>
          <Summary>
            {`When the collateralization of `}
            <Address onClick={() => openEtherscanAddress(position.account, "_blank")}>
              {shortenAddress(position.account, 26)}
            </Address>
            {` drops below ${position.threshold}, it will
            be topped up with ${position.singleTopUp} DAI (${position.singleTopUp.toUsdValue(
              price
            )}). This will be repeated each time the
            collateralization ratio drops below ${position.threshold}, until a total of ${
              position.maxTopUp
            } DAI (${position.maxTopUp.toUsdValue(price)}) is topped
            up.`}
          </Summary>
          <PositionSummary>
            <SummaryRow>
              <Label>
                Protocol
                <Tooltip content="The lending protocol on which the user is borrowing funds (currently compatible with Aave and Compound)" />
              </Label>
              <Label>{position.protocol}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Borrower
                <Tooltip content="The address of the owner of the position to top up (e.g. if Alice is the borrower on Aave that should be topped up then this would be Alice’s address)" />
              </Label>
              <AddressLabel onClick={() => openEtherscanAddress(position.account, "_blank")}>
                {shortenAddress(position.account, 8)}
              </AddressLabel>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Threshold
                <Tooltip content="The health factor threshold a collateral top up should occur at" />
              </Label>
              <Label>{position.threshold}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Singe top-up
                <Tooltip content="Amount of a single top up increment (e.g. top up increments of 2,500 DAI)" />
              </Label>
              <Label>{position.singleTopUp.toCryptoString()}</Label>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Total top-up
                <Tooltip content="Maximum top up amount (value of your liquidity allocated for top ups)" />
              </Label>
              <Label>{position.maxTopUp.toCryptoString()}</Label>
            </SummaryRow>
          </PositionSummary>
        </Content>
      }
    />
  );
};

export default NewPositionConfirmation;
