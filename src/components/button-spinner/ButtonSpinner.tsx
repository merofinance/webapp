import React from "react";
import { Spinner, SpinnerProps } from "react-bootstrap";

type ButtonSpinnerProps = {
  show: boolean;
} & Partial<SpinnerProps>;

export function ButtonSpinner({
  show,
  size = "sm",
  role = "status",
  animation = "border",
}: ButtonSpinnerProps) {
  return show ? (
    <Spinner
      className="mr-1"
      as="span"
      animation={animation}
      size={size}
      role={role}
      aria-hidden="true"
    />
  ) : null;
}
