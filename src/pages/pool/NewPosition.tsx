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

type Props = {
  pool: Pool;
};

const NewPosition = ({ pool }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const allowance = useSelector(selectToupAllowance(backd, pool));
  const balance = useSelector(selectBalance(pool));

  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // Protocol
  const [protocol, setProtocol] = useState("");
  const [protocolError, setProtocolError] = useState("");
  const validateProtocol = (value: string) => {
    if (!value) setProtocolError("Select Protocol");
    else setProtocolError("");
  };

  // Borrower
  const [borrower, setBorrower] = useState("");
  const [borrowerError, setBorrowerError] = useState("");
  const validateBorrower = (value: string) => {
    if (!ethers.utils.isAddress(value)) setBorrowerError("Invalid Address");
    else setBorrowerError("");
  };

  // Threshold
  const [threshold, setThreshold] = useState("");
  const [thresholdError, setThresholdError] = useState("");
  const validateThreshold = (value: string) => {
    const number = Number(value);
    if (number <= 1) setThresholdError("Must be above 1");
    else setThresholdError("");
  };

  // Single Topup
  const [single, setSingle] = useState("");
  const [singleError, setSingleError] = useState("");
  const validateSingle = (value: string) => {
    const number = Number(value);
    if (number <= 0) setSingleError("Must be positive number");
    else if (total && number > Number(total)) setSingleError("Must be less than total topup");
    else setSingleError("");
  };

  // Total Topup
  const [total, setTotal] = useState("");
  const [totalError, setTotalError] = useState("");
  const validateTotal = (value: string) => {
    const number = Number(value);
    if (number <= 0) setTotalError("Must be positive number");
    else if (single && number < Number(single)) setTotalError("Must be greater than single topup");
    else if (number > balance) setTotalError("Exceeds deposited balance");
    else setTotalError("");
  };

  const approved = allowance >= Number(total || "0");

  const hasError = !!(
    protocolError ||
    borrowerError ||
    thresholdError ||
    singleError ||
    totalError
  );

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
    else if (!borrower) return "Enter Borrower";
    else if (!threshold) return "Enter Threshold";
    else if (!single) return "Enter Single topup";
    else if (!total) return "Enter Total topup";
    else return "";
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
              setValue={(v: string) => {
                validateProtocol(v);
                setProtocol(v);
              }}
            />
          </Value>
          <NewPositionInput
            type="text"
            value={borrower}
            setValue={(v: string) => {
              validateBorrower(v);
              setBorrower(v);
            }}
            error={borrowerError}
          />
          <NewPositionInput
            type="number"
            value={threshold}
            setValue={(v: string) => {
              validateThreshold(v);
              setThreshold(v);
            }}
            error={thresholdError}
          />
          <NewPositionInput
            type="number"
            value={single}
            setValue={(v: string) => {
              validateSingle(v);
              setSingle(v);
            }}
            error={singleError}
          />
          <NewPositionInput
            type="number"
            value={total}
            setValue={(v: string) => {
              validateTotal(v);
              setTotal(v);
            }}
            error={totalError}
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
