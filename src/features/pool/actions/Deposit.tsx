import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { Pool } from "../../../lib";

type DepositProps = {
  pool: Pool;
};

export function Deposit({ pool }: DepositProps) {
  const availableToDeposit = 15345;
  const [value, setValue] = useState(0);
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
      <Form>
        <Form.Group controlId="formBasicRange">
          <InputGroup className="mb-2">
            <Form.Control type="number" value={value} />
            <InputGroup.Append>
              <InputGroup.Text>{pool.asset}</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <Form.Control
            type="range"
            value={value}
            max={availableToDeposit}
            onChange={(e) => setValue(parseInt(e.target.value, 10))}
          />
        </Form.Group>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Deposit
          </Button>
        </div>
      </Form>
    </>
  );
}
