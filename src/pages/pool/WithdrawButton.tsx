import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { Pool } from "../../lib";
import { useLoading } from "../../app/hooks/use-loading";
import { selectBalance, unstake, withdraw } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import { TokenValue } from "../../lib/token-value";

const StyledProgressButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.7rem;
`;

type Props = {
  value: TokenValue;
  pool: Pool;
  complete: () => void;
};

const WithdrawalButton = ({ value, pool, complete }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const totalBalance = useSelector(selectBalance(pool));
  const staked = useSelector(selectBalance(pool.stakerVaultAddress));
  const availableToWithdraw = totalBalance.sub(staked);

  const executeWithdraw = async (amount: TokenValue) => {
    dispatch(withdraw({ backd: backd!, pool: pool, amount })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "withdraw" });
      complete();
      setLoading(false);
    });
  };

  const executeUnstake = () => {
    dispatch(unstake({ backd: backd!, pool: pool, amount: staked })).then((v) => {
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
          if (!backd) return;
          setLoading(true);
          if (value.lte(availableToWithdraw)) executeWithdraw(value);
          else executeUnstake();
        }}
        disabled={value.isZero()}
        loading={loading}
        hoverText={"Enter Amount"}
      />
    </StyledProgressButtons>
  );
};

export default WithdrawalButton;
