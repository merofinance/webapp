import React, { ChangeEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { Pool } from "../../../lib";

type DepositFormProps = {
  pool: Pool;
  available: number;
};

function DepositForm({ pool, available }: DepositFormProps) {
  const [value, setValue] = useState(0);
  const [valueError, setValueError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawNewValue = e.target.value;
    const newValue = parseInt(rawNewValue, 10);
    let error = "";
    if (newValue > available) {
      error = "Not enough funds available";
    }
    if (!isNaN(newValue)) {
      setValue(newValue);
      setValueError(error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formBasicRange">
        <InputGroup className="mb-2">
          <Form.Control
            type="number"
            value={value.toString()}
            onChange={handleChange}
            isInvalid={valueError.length > 0}
          />
          <InputGroup.Append>
            <InputGroup.Text>{pool.asset}</InputGroup.Text>
          </InputGroup.Append>

          <Form.Control.Feedback type="invalid">
            {valueError}
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Control
          type="range"
          value={value}
          max={available}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="text-center mt-4">
        <Button variant="primary" type="submit">
          Deposit
        </Button>
      </div>
    </Form>
  );
}

type DepositProps = {
  pool: Pool;
};

export function Deposit({ pool }: DepositProps) {
  const availableToDeposit = 14831;
  return (
    <>
      <dl>
        <dt>Available to deposit</dt>
        <dd>
          <NumberFormat
            displayType={"text"}
            value={availableToDeposit}
            thousandSeparator={true}
            suffix={` ${pool.asset}`}
          />
        </dd>
      </dl>
      {availableToDeposit > 0 ? (
        <DepositForm pool={pool} available={availableToDeposit} />
      ) : (
        <p className="text-center">No funds available to deposit</p>
      )}
    </>
  );
}
