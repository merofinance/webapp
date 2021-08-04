import React from "react";
import { Pool } from "../../lib";
import { useLoading } from "../../app/hooks/use-loading";
import { approve, deposit, selectDepositAllowance } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import MultiStepButtons from "../../components/MultiStepButtons";
import { ETH_DUMMY_ADDRESS, INFINITE_APPROVE_AMMOUNT } from "../../lib/constants";
import Button from "../../components/Button";

type Props = {
  value: number;
  pool: Pool;
  complete: () => void;
};

const DepositButtons = ({ value, pool, complete }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const approvedToDeposit = useSelector(selectDepositAllowance(pool));
  const approved = approvedToDeposit >= value;

  const executeApprove = async () => {
    if (!backd || approved) return;
    const approveAction = approve({
      token: pool.underlying,
      spender: pool.address,
      amount: INFINITE_APPROVE_AMMOUNT,
      backd: backd,
    });
    const v = await dispatch(approveAction);
    handleTxDispatch({ status: v.meta.requestStatus, actionType: "approve" });
  };

  const executeDeposit = async () => {
    if (!backd || !approved) return;
    const v = await dispatch(deposit({ backd: backd, pool: pool, amount: value }));
    handleTxDispatch({ status: v.meta.requestStatus, actionType: "deposit" });
    complete();
  };

  return (
    <>
      {pool.underlying.address !== ETH_DUMMY_ADDRESS && (
        <MultiStepButtons
          disabled={value === 0}
          firstText={`Approve ${pool.underlying.symbol}`}
          firstAction={executeApprove}
          firstComplete={approved}
          firstHoverText="Enter Amount"
          secondText="Deposit and Stake"
          secondAction={executeDeposit}
          secondHoverText={`Approve ${pool.underlying.symbol}`}
        />
      )}
      {pool.underlying.address === ETH_DUMMY_ADDRESS && (
        <Button
          primary
          medium
          wide
          text="Deposit and Stake"
          click={async () => {
            setLoading(true);
            await executeDeposit();
            setLoading(false);
          }}
          disabled={value === 0}
          loading={loading}
          hoverText="Enter Amount"
        />
      )}
    </>
  );
};

export default DepositButtons;
