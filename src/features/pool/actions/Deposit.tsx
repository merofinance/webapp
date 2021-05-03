import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../../../app/hooks/use-backd";
import { useLoading } from "../../../app/hooks/use-loading";
import { AppDispatch } from "../../../app/store";
import { AmountInputForm } from "../../../components/amount-input-form/AmountInputForm";
import { Pool } from "../../../lib";
import { pendingTransactionsCount } from "../../transactions-list/transactionsSlice";
import { approve, deposit, selectBalance, selectDepositAllowance } from "../../user/userSlice";

type DepositProps = {
  pool: Pool;
};

export function Deposit({ pool }: DepositProps) {
  const backd = useBackd();
  const dispatch: AppDispatch = useDispatch();
  const [submitText, setSubmitText] = useState("Deposit");
  const availableToDeposit = useSelector(selectBalance(pool.underlying.address));
  const approvedToDeposit = useSelector(selectDepositAllowance(pool));
  const [depositAmount, setDepositAmount] = useState(0);
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const [shouldResetValue, setShouldResetValue] = useState(false);
  const pendingTxCount = useSelector(pendingTransactionsCount);

  const handleValueChange = (value: number) => setDepositAmount(value);

  useEffect(() => {
    const submitText = depositAmount > approvedToDeposit ? "Approve" : "Deposit";
    setSubmitText(submitText);
    setLoading(pendingTxCount > 0);
    if (shouldResetValue && pendingTxCount === 0) {
      setShouldResetValue(false);
      setDepositAmount(0);
    }
  }, [
    depositAmount,
    approvedToDeposit,
    pendingTxCount,
    shouldResetValue,
    setShouldResetValue,
    setLoading,
  ]);

  const executeApprove = (amount: number) => {
    if (!backd) return;
    setLoading(true);
    const approveAction = approve({ token: pool.underlying, spender: pool.address, amount, backd });
    dispatch(approveAction).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "approve" });
    });
  };

  const executeDeposit = (amount: number) => {
    if (!backd) return;
    setLoading(true);
    dispatch(deposit({ backd, pool, amount })).then((v) => {
      if (handleTxDispatch({ status: v.meta.requestStatus, actionType: "deposit" })) {
        setShouldResetValue(true);
      }
    });
  };

  const handleSubmit = (amount: number) => {
    if (amount > approvedToDeposit) {
      executeApprove(amount);
    } else {
      executeDeposit(amount);
    }
  };

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
      {backd && availableToDeposit > 0 ? (
        <AmountInputForm
          submitText={submitText}
          assetName={pool.underlying.symbol}
          maxAmount={availableToDeposit}
          handleChange={handleValueChange}
          handleSubmit={handleSubmit}
          loading={loading}
          value={depositAmount}
        />
      ) : (
        <p className="text-center">No funds available to deposit</p>
      )}
    </>
  );
}
