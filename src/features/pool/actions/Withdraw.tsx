import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../../../app/hooks/use-backd";
import { useLoading } from "../../../app/hooks/use-loading";
import { AppDispatch } from "../../../app/store";
import { AmountInputForm } from "../../../components/amount-input-form/AmountInputForm";
import { Pool } from "../../../lib";
import { pendingTransactionsCount } from "../../transactions-list/transactionsSlice";
import { selectBalance, unstake, withdraw } from "../../user/userSlice";

type WithdrawProps = {
  pool: Pool;
};

export function Withdraw({ pool }: WithdrawProps) {
  const totalBalance = useSelector(selectBalance(pool));
  const staked = useSelector(selectBalance(pool.stakerVaultAddress));
  const availableToWithdraw = totalBalance - staked;
  const backd = useBackd();
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const pendingTxCount = useSelector(pendingTransactionsCount);
  const dispatch: AppDispatch = useDispatch();
  const handleValueChange = (value: number) => setWithdrawAmount(value);

  const submitText = withdrawAmount <= availableToWithdraw ? "Withdraw" : "Unstake";

  useEffect(() => {
    setLoading(pendingTxCount > 0);
    if (pendingTxCount === 0) {
      setWithdrawAmount(0);
    }
  }, [pendingTxCount, setWithdrawAmount, setLoading]);

  const executeWithdraw = (amount: number) => {
    if (!backd) return;
    dispatch(withdraw({ backd, pool, amount })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "withdraw" });
    });
  };

  const executeUnstake = (amount: number) => {
    if (!backd) return;
    dispatch(unstake({ backd, pool, amount })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "unstake" });
    });
  };

  const handleSubmit = (amount: number) => {
    setLoading(true);
    if (withdrawAmount <= availableToWithdraw) {
      executeWithdraw(amount);
    } else {
      executeUnstake(amount);
    }
  };

  return (
    <>
      <div className="text-center">
        <h5>Available to withdraw</h5>
        <NumberFormat
          displayType="text"
          value={availableToWithdraw}
          thousandSeparator={true}
          suffix={` ${pool.lpToken.symbol}`}
        />
        {staked > 0 ? (
          <NumberFormat
            displayType="text"
            value={staked}
            thousandSeparator={true}
            prefix=" (+ "
            suffix={` ${pool.lpToken.symbol} staked)`}
          />
        ) : null}
      </div>
      {totalBalance > 0 ? (
        <AmountInputForm
          submitText={submitText}
          handleSubmit={handleSubmit}
          handleChange={handleValueChange}
          assetName={pool.lpToken.symbol}
          maxAmount={totalBalance}
          loading={loading}
          value={withdrawAmount}
        />
      ) : (
        <p className="text-center">No funds available to withdraw</p>
      )}
    </>
  );
}
