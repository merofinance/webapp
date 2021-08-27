import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pool } from "../../lib";
import { deposit } from "../../state/userSlice";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import ApproveThenAction from "../../components/ApproveThenAction";
import { ETH_DUMMY_ADDRESS } from "../../lib/constants";
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
  const depositLoading = useSelector(hasPendingTransaction("Deposit"));

  useEffect(() => {
    if (!depositLoading) complete();
  }, [depositLoading]);

  const executeDeposit = () => {
    if (!backd || depositLoading) return;
    dispatch(deposit({ backd, pool, amount: value }));
  };

  return (
    <>
      {pool.underlying.address !== ETH_DUMMY_ADDRESS && (
        <ApproveThenAction
          label="Deposit and Stake"
          action={executeDeposit}
          value={value}
          loading={depositLoading}
          disabled={!valid}
          token={pool.underlying}
          contract={pool.address}
        />
      )}
      {pool.underlying.address === ETH_DUMMY_ADDRESS && (
        <Button
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
