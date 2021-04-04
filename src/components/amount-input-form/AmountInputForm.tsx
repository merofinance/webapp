import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

type AmountInputFormProps = {
  assetName: string;
  maxAmount: number;
  submitText: string;
  handleChange?: (value: number) => void;
  handleSubmit: (value: number) => void;
};

export function AmountInputForm({
  assetName,
  maxAmount,
  submitText,
  handleSubmit,
  handleChange,
}: AmountInputFormProps) {
  const [value, setValue] = useState(0);
  const [valueError, setValueError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawNewValue = e.target.value;
    const newValue = parseInt(rawNewValue.replace(/,/g, ""), 10);
    let error = "";
    if (newValue > maxAmount) {
      error = "Not enough funds available";
    }
    if (!isNaN(newValue)) {
      setValue(newValue);
      setValueError(error);
      if (handleChange) {
        handleChange(newValue);
      }
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicRange">
        <InputGroup className="mb-2">
          <Form.Control
            type="number"
            value={value.toString()}
            onChange={onChange}
            isInvalid={valueError.length > 0}
          />
          <InputGroup.Append>
            <InputGroup.Text>{assetName}</InputGroup.Text>
          </InputGroup.Append>

          <Form.Control.Feedback type="invalid">{valueError}</Form.Control.Feedback>
        </InputGroup>
        <Form.Control type="range" value={value} max={maxAmount} onChange={onChange} />
      </Form.Group>

      <div className="text-center mt-4">
        <Button variant="primary" type="submit" disabled={value <= 0}>
          {submitText}
        </Button>
      </div>
    </Form>
  );
}
