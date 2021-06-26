import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/styles/Button";
import NewPositionConfirmation from "./NewPositionConfirmation";
import NewPositionInput from "./NewPositionInput";

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

const NewPosition = () => {
  const [protocol, setProtocol] = useState("");
  const [protocolError, setProtocolError] = useState("");

  const [borrower, setBorrower] = useState("");
  const [borrowerError, setBorrowerError] = useState("");

  const [threshold, setThreshold] = useState("");
  const [thresholdError, setThresholdError] = useState("");

  const [single, setSingle] = useState("");
  const [singleError, setSingleError] = useState("");

  const [total, setTotal] = useState("");
  const [totalError, setTotalError] = useState("");

  const [confirming, setConfirming] = useState(false);
  const [approved, setApproved] = useState(false);

  const hasError = protocolError || borrowerError || thresholdError || singleError || totalError;

  return (
    <Border>
      <StyledNewPosition>
        <Content>
          <Value>
            <Dropdown
              value={protocol}
              options={["aave", "compound"]}
              setValue={(v: string) => setProtocol(v)}
            />
          </Value>
          <NewPositionInput
            type="text"
            value={borrower}
            setValue={(v: string) => setBorrower(v)}
            error={borrowerError}
          />
          <NewPositionInput
            type="number"
            value={threshold}
            setValue={(v: string) => setThreshold(v)}
            error={thresholdError}
          />
          <NewPositionInput
            type="number"
            value={single}
            setValue={(v: string) => setSingle(v)}
            error={singleError}
          />
          <NewPositionInput
            type="number"
            value={total}
            setValue={(v: string) => setTotal(v)}
            error={totalError}
          />
          <Value>
            <Button
              primary
              disabled={!(protocol && borrower && threshold && single && total)}
              text={approved ? "create 2/2" : "approve 1/2"}
              click={() => {
                if (approved) setConfirming(true);
                else setApproved(true);
              }}
            />
          </Value>
        </Content>
        {hasError && <ErrorSpacing />}
      </StyledNewPosition>
      <NewPositionConfirmation
        show={confirming}
        close={() => setConfirming(false)}
        position={{
          protocol,
          borrower,
          threshold: Number(threshold),
          single: Number(single),
          total: Number(total),
        }}
      />
    </Border>
  );
};

export default NewPosition;
