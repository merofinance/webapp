import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button";
import { Pool } from "../../lib";
import { useLoading } from "../../app/hooks/use-loading";
import { selectBalance, unstake, withdraw } from "../../state/userSlice";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import { ScaledNumber } from "../../lib/scaled-number";

const StyledProgressButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Props = {
  value: ScaledNumber;
  pool: Pool;
  complete: () => void;
  valid: boolean;
};

const WithdrawalButton = ({ value, pool, complete, valid }: Props): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const totalBalance = useSelector(selectBalance(pool));
  const staked = useSelector(selectBalance(pool.stakerVaultAddress));
  const availableToWithdraw = totalBalance.sub(staked);

  const executeWithdraw = async (amount: ScaledNumber) => {
    if (!backd) return;
    dispatch(withdraw({ backd, pool, amount })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "withdraw" });
      complete();
      setLoading(false);
    });
  };

  const executeUnstake = () => {
    if (!backd) return;
    dispatch(unstake({ backd, pool, amount: staked })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "unstake" });
      complete();
      setLoading(false);
    });
  };

  return (
    <StyledProgressButtons>
      <Button
        primary
        medium
        wide
        text={`Withdraw ${pool.underlying.symbol.toUpperCase()}`}
        click={() => {
          if (!valid) return;
          setLoading(true);
          if (value.lte(availableToWithdraw)) executeWithdraw(value);
          else executeUnstake();
        }}
        disabled={!valid}
        loading={loading}
        hoverText="Enter Amount"
      />
    </StyledProgressButtons>
  );
};

export default WithdrawalButton;
