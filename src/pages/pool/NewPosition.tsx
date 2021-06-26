import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/styles/Button";

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
  background: linear-gradient(to right, #451467, #173d63);
  border-radius: 1.2rem;
  padding: 0.9rem 2rem;

  > div:last-child {
    justify-content: flex-end;
  }
`;

const Value = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const InputBorder = styled.div`
  background: linear-gradient(to right, #c532f9, #32b2e5);
  padding: 1px;
  border-radius: 7px;
  height: 3.2rem;
  width: 67%;
`;

const Input = styled.input`
  width: 100%;
  background-color: #252140;
  border-radius: 6px;
  height: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  letter-spacing: 0.15px;
  font-weight: 400;

  ::-webkit-outer-spin-button {
    display: none;
  }
  ::-webkit-inner-spin-button {
    display: none;
  }

  ::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const NewPosition = () => {
  const [protocol, setProtocol] = useState("");
  const [borrower, setBorrower] = useState("");
  const [threshold, setThreshold] = useState("");
  const [single, setSingle] = useState("");
  const [total, setTotal] = useState("");

  return (
    <Border>
      <StyledNewPosition>
        <Value>
          <Dropdown
            value={protocol}
            options={["aave", "compound"]}
            setValue={(v: string) => setProtocol(v)}
          />
        </Value>
        <Value>
          <InputBorder>
            <Input
              type="text"
              value={borrower}
              placeholder="0"
              onChange={(e) => setBorrower(e.target.value)}
            />
          </InputBorder>
        </Value>
        <Value>
          <InputBorder>
            <Input
              type="number"
              value={threshold}
              placeholder="0"
              onChange={(e) => setThreshold(e.target.value)}
            />
          </InputBorder>
        </Value>
        <Value>
          <InputBorder>
            <Input
              type="number"
              value={single}
              placeholder="0"
              onChange={(e) => setSingle(e.target.value)}
            />
          </InputBorder>
        </Value>
        <Value>
          <InputBorder>
            <Input
              type="number"
              value={total}
              placeholder="0"
              onChange={(e) => setTotal(e.target.value)}
            />
          </InputBorder>
        </Value>
        <Value>
          <Button primary disabled text="Create 1/2" />
        </Value>
      </StyledNewPosition>
    </Border>
  );
};

export default NewPosition;
