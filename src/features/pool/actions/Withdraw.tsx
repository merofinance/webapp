import React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { AmountInputForm } from "../../../components/amount-input-form/AmountInputForm";
import { Pool } from "../../../lib";
import { selectBalance } from "../../user/userSlice";

type WithdrawProps = {
  pool: Pool;
};

export function Withdraw({ pool }: WithdrawProps) {
  const availableToWithdraw = useSelector(selectBalance(pool));

  const executeWithdraw = (value: number) => {
    console.log(value);
  };

  return (
    <>
      <div className="text-center">
        <h5>Available to withdraw</h5>
        <NumberFormat
          displayType={"text"}
          value={availableToWithdraw}
          thousandSeparator={true}
          suffix={` ${pool.lpToken.symbol}`}
        />
      </div>
      {availableToWithdraw > 0 ? (
        <AmountInputForm
          submitText="Withdraw"
          handleSubmit={executeWithdraw}
          assetName={pool.lpToken.symbol}
          maxAmount={availableToWithdraw}
        />
      ) : (
        <p className="text-center">No funds available to withdraw</p>
      )}
    </>
  );
}
