import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pool } from "../../lib";
import { approve, deposit, selectDepositAllowance } from "../../state/userSlice";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import MultiStepButtons from "../../components/MultiStepButtons";
import { ETH_DUMMY_ADDRESS, INFINITE_APPROVE_AMMOUNT } from "../../lib/constants";
import Button from "../../components/Button";
import { ScaledNumber } from "../../lib/scaled-number";
import { hasPendingTransaction } from "../../state/transactionsSlice";

type Props = {
  value: ScaledNumber;
  pool: Pool;
  complete: () => void;
  valid: boolean;
};

const DepositButtons = ({ value, pool, complete, valid }: Props): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const approvedToDeposit = useSelector(selectDepositAllowance(pool));
  const approveLoading = useSelector(hasPendingTransaction("Approve"));
  const depositLoading = useSelector(hasPendingTransaction("Deposit"));

  useEffect(() => {
    if (!depositLoading) complete();
  }, [depositLoading]);

  const approved = approvedToDeposit.gte(value);

  const executeApprove = () => {
    if (!backd || approved || approveLoading) return;
    dispatch(
      approve({
        token: pool.underlying,
        spender: pool.address,
        amount: ScaledNumber.fromUnscaled(INFINITE_APPROVE_AMMOUNT),
        backd,
      })
    );
  };

  const executeDeposit = () => {
    if (!backd || !approved || depositLoading) return;
    dispatch(deposit({ backd, pool, amount: value }));
  };

  return (
    <>
      {pool.underlying.address !== ETH_DUMMY_ADDRESS && (
        <MultiStepButtons
          disabled={!valid}
          firstText={`Approve ${pool.underlying.symbol}`}
          firstAction={executeApprove}
          firstComplete={approved}
          firstHoverText="Enter Amount"
          firstLoading={approveLoading}
          secondText="Deposit and Stake"
          secondAction={executeDeposit}
          secondHoverText={`Approve ${pool.underlying.symbol}`}
          secondLoading={depositLoading}
        />
      )}
      {pool.underlying.address === ETH_DUMMY_ADDRESS && (
        <Button
          web3
          primary
          medium
          wide
          text="Deposit and Stake"
          click={executeDeposit}
          disabled={!valid}
          loading={depositLoading}
          hoverText="Enter Amount"
        />
      )}
    </>
  );
};

export default DepositButtons;
