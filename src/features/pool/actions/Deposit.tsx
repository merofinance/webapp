import React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { AmountInputForm } from "../../../components/amount-input-form/AmountInputForm";
import { Pool } from "../../../lib";
import { selectBalance } from "../selectors";

type DepositProps = {
  pool: Pool;
};

export function Deposit({ pool }: DepositProps) {
  const availableToDeposit = useSelector(selectBalance(pool.underlying.address));

  const executeDeposit = (value: number) => {
    console.log(value);
  };

  return (
    <>
      <div className="text-center">
        <h5>Available to deposit</h5>
        <NumberFormat
          displayType={"text"}
          defaultValue={availableToDeposit}
          thousandSeparator={true}
          suffix={` ${pool.underlying.symbol}`}
        />
      </div>
      {availableToDeposit > 0 ? (
        <AmountInputForm
          submitText="Deposit"
          assetName={pool.underlying.symbol}
          maxAmount={availableToDeposit}
          handleSubmit={executeDeposit}
        />
      ) : (
        <p className="text-center">No funds available to deposit</p>
      )}
    </>
  );
}
