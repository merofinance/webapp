import React from "react";
import NumberFormat from "react-number-format";
import { AmountInputForm } from "../../../components/amount-input-form/AmountInputForm";
import { Pool } from "../../../lib";

type WithdrawProps = {
  pool: Pool;
};

export function Withdraw({ pool }: WithdrawProps) {
  const availableToWithdraw = 8431;
  return (
    <>
      <div className="text-center">
        <h5>Available to withdraw</h5>
        <NumberFormat
          displayType={"text"}
          value={availableToWithdraw}
          thousandSeparator={true}
          suffix={` ${pool.asset}`}
        />
      </div>
      {availableToWithdraw > 0 ? (
        <AmountInputForm
          submitText="Withdraw"
          assetName={pool.asset}
          maxAmount={availableToWithdraw}
        />
      ) : (
        <p className="text-center">No funds available to withdraw</p>
      )}
    </>
  );
}
