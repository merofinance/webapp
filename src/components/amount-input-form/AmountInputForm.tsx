import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";

type AmountInputFormProps = {
  assetName: string;
  maxAmount: number;
  submitText: string;
  loading?: boolean;
  value: number;
  handleChange?: (value: number) => void;
  handleSubmit: (value: number) => void;
};

export function AmountInputForm({
  assetName,
  maxAmount,
  submitText,
  handleSubmit,
  handleChange,
  value,
  loading = false,
}: AmountInputFormProps) {
  const [valueError, setValueError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawNewValue = e.target.value;
    const newValue = parseInt(rawNewValue.replace(/,/g, ""), 10);
    let error = "";
    if (newValue > maxAmount) {
      error = "Not enough funds available";
    }
    if (!isNaN(newValue)) {
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
        <Button variant="primary" type="submit" disabled={value <= 0 || loading}>
          {loading ? (
            <Spinner
              className="mr-1"
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
          {submitText}
        </Button>
      </div>
    </Form>
  );
}
