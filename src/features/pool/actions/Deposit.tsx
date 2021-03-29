import React from "react";
import NumberFormat from "react-number-format";
import { AmountInputForm } from "../../../components/amount-input-form/AmountInputForm";
import { Pool } from "../../../lib";

type DepositProps = {
  pool: Pool;
};

export function Deposit({ pool }: DepositProps) {
  const availableToDeposit = 14831;
  return (
    <>
      <div className="text-center">
        <h5>Available to deposit</h5>
        <NumberFormat
          displayType={"text"}
          value={availableToDeposit}
          thousandSeparator={true}
          suffix={` ${pool.underlying.symbol}`}
        />
      </div>
      {availableToDeposit > 0 ? (
        <AmountInputForm
          submitText="Deposit"
          assetName={pool.underlying.symbol}
          maxAmount={availableToDeposit}
        />
      ) : (
        <p className="text-center">No funds available to deposit</p>
      )}
    </>
  );
}
