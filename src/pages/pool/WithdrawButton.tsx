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

const WithdrawalButton = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const totalBalance = useSelector(selectBalance(props.pool));
  const staked = useSelector(selectBalance(props.pool.stakerVaultAddress));
  const availableToWithdraw = new TokenValue(totalBalance.value.sub(staked.value), staked.decimals);

  const executeWithdraw = async (amount: TokenValue) => {
    dispatch(withdraw({ backd: backd!, pool: props.pool, amount })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "withdraw" });
      props.complete();
      setLoading(false);
    });
  };

  const executeUnstake = () => {
    dispatch(unstake({ backd: backd!, pool: props.pool, amount: staked })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "unstake" });
      props.complete();
      setLoading(false);
    });
  };

  return (
    <StyledProgressButtons>
      <Button
        primary
        medium
        wide
        text={`Withdraw ${props.pool.underlying.symbol.toUpperCase()}`}
        click={() => {
          if (!backd) return;
          setLoading(true);
          if (props.value.value.lte(availableToWithdraw.value)) executeWithdraw(props.value);
          else executeUnstake();
        }}
        disabled={props.value.isZero}
        loading={loading}
        hoverText={"Enter Amount"}
      />
    </StyledProgressButtons>
  );
};

export default WithdrawalButton;
