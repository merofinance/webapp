import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";

import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import Popup from "../../components/Popup";
import { GradientLink } from "../../styles/GradientText";
import Tooltip from "../../components/Tooltip";
import { registerPosition } from "../../state/positionsSlice";
import { shortenAddress } from "../../lib/text";
import { Pool, Position } from "../../lib/types";
import { selectPrice } from "../../state/selectors";
import { ETHERSCAN_URL } from "../../lib/constants";
import { useDevice } from "../../app/hooks/use-device";
import { hasPendingTransaction } from "../../state/transactionsSlice";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Summary = styled.div`
  width: 100%;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const Address = styled(GradientLink)`
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  cursor: pointer;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const PositionSummary = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(60, 60, 60, 0.5);
  border-radius: 1.4rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;

  margin-top: 4.8rem;
  @media (max-width: 600px) {
    margin-top: 1.8rem;
  }
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
  letter-spacing: 0.15px;
  text-transform: capitalize;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const AddressLabel = styled(GradientLink)`
  font-weight: 500;
  letter-spacing: 0.15px;
  cursor: pointer;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

type Props = {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
  complete: () => void;
};

const NewPositionConfirmation = ({ show, close, position, pool, complete }: Props): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const price = useSelector(selectPrice(pool));
  const loading = useSelector(hasPendingTransaction("Register"));
  const { isMobile } = useDevice();

  useEffect(() => {
    if (!loading) {
      complete();
      close();
    }
  }, [loading]);

  const executeRegister = () => {
    if (!backd) return;
    dispatch(registerPosition({ position, pool, backd }));
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
            <Address
              href={`${ETHERSCAN_URL}${position.account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenAddress(position.account, isMobile ? 10 : 26)}
              <LaunchIcon style={{ fill: "var(--secondary)" }} />
            </Address>
            {` drops below ${position.threshold.toString()}, it will
            be topped up with ${position.singleTopUp} ${
              pool.underlying.symbol
            } (${position.singleTopUp.toUsdValue(price)}). This will be repeated each time the
            collateralization ratio drops below ${position.threshold}, until a total of ${
              position.maxTopUp
            } ${pool.underlying.symbol} (${position.maxTopUp.toUsdValue(price)}) is topped up.`}
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
              <AddressLabel
                href={`${ETHERSCAN_URL}${position.account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortenAddress(position.account, 8)}
                <LaunchIcon style={{ fill: "var(--secondary)" }} />
              </AddressLabel>
            </SummaryRow>
            <SummaryRow>
              <Label>
                Threshold
                <Tooltip content="The health factor threshold a collateral top up should occur at" />
              </Label>
              <Label>{position.threshold.toString()}</Label>
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
