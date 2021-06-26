import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "../../components/Dropdown";

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
  padding: 1.7rem 2rem;

  div:last-child {
    justify-content: flex-end;
    flex: 0.5;
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

const NewPosition = () => {
  const [protocol, setProtocol] = useState("");

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
        <Value>meow</Value>
        <Value>meow</Value>
        <Value>meow</Value>
        <Value>meow</Value>
        <Value>meow</Value>
      </StyledNewPosition>
    </Border>
  );
};

export default NewPosition;
