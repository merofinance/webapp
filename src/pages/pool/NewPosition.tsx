import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useBackd } from "../../app/hooks/use-backd";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { approve, selectBalance, selectToupAllowance } from "../../features/user/userSlice";
import { Pool } from "../../lib";
import { Position } from "../../lib/types";
import NewPositionConfirmation from "./NewPositionConfirmation";
import NewPositionInput from "./NewPositionInput";
import { AppDispatch } from "../../app/store";
import { ethers } from "ethers";
import { selectPositions } from "../../features/positions/positionsSlice";

const Border = styled.div`
  width: 100%;
  background: linear-gradient(to right, #c532f9 1%, #32b2e5 101%);
  margin-top: 0.6rem;
  border-radius: 1.3rem;
  padding: 1px;
`;

const StyledNewPosition = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #451467, #173d63);
  border-radius: 1.2rem;
  padding: 0.9rem 2rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;

  > div:last-child {
    justify-content: flex-end;
  }
`;

const ErrorSpacing = styled.div`
  height: 2.8rem;
`;

export const Value = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

interface Props {
  pool: Pool;
}

const NewPosition = ({ pool }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const allowance = useSelector(selectToupAllowance(backd, pool));
  const balance = useSelector(selectBalance(pool));
  const positions = useSelector(selectPositions);

  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [borrower, setBorrower] = useState("");
  const [threshold, setThreshold] = useState("");
  const [single, setSingle] = useState("");
  const [total, setTotal] = useState("");

  const approved = allowance >= Number(total || "0");

  const borrowerError = () => {
    if (!borrower) return "";
    if (!ethers.utils.isAddress(borrower)) return "Invalid sddress";
    if (
      protocol &&
      positions.filter(
        (position: Position) => position.protocol === protocol && position.account === borrower
      ).length > 0
    )
      return "Max of one position per protocol and address";
    return "";
  };

  const thresholdError = () => {
    if (!threshold) return "";
    const number = Number(threshold);
    if (number <= 1) return "Must be above 1";
    return "";
  };

  const singleError = () => {
    if (!single) return "";
    const number = Number(single);
    if (number <= 0) return "Must be positive number";
    if (total && number > Number(total)) return "Must be less than total topup";
    return "";
  };

  const totalError = () => {
    if (!total) return "";
    const number = Number(total);
    if (number <= 0) return "Must be positive number";
    if (number > balance) return "Exceeds deposited balance";
    else return "";
  };

  const hasError = !!(borrowerError() || thresholdError() || singleError() || totalError());

  const position: Position = {
    protocol,
    account: borrower,
    threshold: Number(threshold),
    singleTopUp: Number(single),
    totalTopUp: Number(total),
    maxGasPrice: 0,
    actionToken: pool.underlying.address,
    depositToken: pool.lpToken.address,
  };

  const buttonHoverText = () => {
    if (!protocol) return "Select Protocol";
    if (!borrower) return "Enter Borrower";
    if (!threshold) return "Enter Threshold";
    if (!single) return "Enter Single topup";
    if (!total) return "Enter Total topup";
    return "";
  };

  const executeApprove = () => {
    if (!backd) return;
    setLoading(true);
    const approveArgs = {
      amount: Number(total),
      backd,
      spender: backd.topupActionAddress,
      token: pool.lpToken,
    };
    dispatch(approve(approveArgs)).then(() => {
      setLoading(false);
    });
  };

  const clearInputs = () => {
    setProtocol("");
    setBorrower("");
    setThreshold("");
    setSingle("");
    setTotal("");
  };

  return (
    <Border>
      <StyledNewPosition>
        <Content>
          <Value>
            <Dropdown
              value={protocol}
              options={["Aave", "Compound"]}
              setValue={(v: string) => setProtocol(v)}
            />
          </Value>
          <NewPositionInput
            type="text"
            value={borrower}
            setValue={(v: string) => setBorrower(v)}
            error={borrowerError()}
          />
          <NewPositionInput
            type="number"
            value={threshold}
            setValue={(v: string) => setThreshold(v)}
            error={thresholdError()}
          />
          <NewPositionInput
            type="number"
            value={single}
            setValue={(v: string) => setSingle(v)}
            error={singleError()}
          />
          <NewPositionInput
            type="number"
            value={total}
            setValue={(v: string) => setTotal(v)}
            error={totalError()}
          />
          <Value>
            <Button
              primary
              disabled={!(protocol && borrower && threshold && single && total) || hasError}
              text={approved && total !== "" ? "create 2/2" : "approve 1/2"}
              click={() => {
                if (approved) setConfirming(true);
                else executeApprove();
              }}
              hoverText={buttonHoverText()}
              loading={loading}
            />
          </Value>
        </Content>
        {hasError && <ErrorSpacing />}
      </StyledNewPosition>
      <NewPositionConfirmation
        show={confirming}
        close={() => setConfirming(false)}
        position={position}
        pool={pool}
        complete={() => clearInputs()}
      />
    </Border>
  );
};

export default NewPosition;
