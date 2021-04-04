import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../../../app/hooks/use-backd";
import { AppDispatch } from "../../../app/store";
import { AmountInputForm } from "../../../components/amount-input-form/AmountInputForm";
import { Pool } from "../../../lib";
import { selectPoolAllowance, selectBalance, approve } from "../../user/userSlice";

type DepositProps = {
  pool: Pool;
};

export function Deposit({ pool }: DepositProps) {
  const backd = useBackd();
  const dispatch: AppDispatch = useDispatch();
  const [submitText, setSubmitText] = useState("Deposit");
  const availableToDeposit = useSelector(selectBalance(pool.underlying.address));
  const approvedToDeposit = useSelector(selectPoolAllowance(pool));
  const [depositAmount, setDepositAmount] = useState(0);

  const handleValueChange = (value: number) => {
    setDepositAmount(value);
  };

  useEffect(() => {
    const submitText = depositAmount > approvedToDeposit ? "Approve & deposit" : "Deposit";
    setSubmitText(submitText);
  }, [depositAmount, approvedToDeposit]);

  const executeDeposit = (amount: number) => {
    if (!backd) return;
    dispatch(approve({ token: pool.underlying, spender: pool.address, amount, backd })).then(() => {
      console.log("approve tx dispatched");
    });
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
      {backd && availableToDeposit > 0 ? (
        <AmountInputForm
          submitText={submitText}
          assetName={pool.underlying.symbol}
          maxAmount={availableToDeposit}
          handleChange={handleValueChange}
          handleSubmit={executeDeposit}
        />
      ) : (
        <p className="text-center">No funds available to deposit</p>
      )}
    </>
  );
}
