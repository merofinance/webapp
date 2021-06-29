import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "./styles/Button";
import tick from "../assets/ui/tick.svg";
import { Pool } from "../lib";
import { useLoading } from "../app/hooks/use-loading";
import {
  approve,
  deposit,
  selectBalance,
  selectDepositAllowance,
  unstake,
  withdraw,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../app/hooks/use-backd";
import { AppDispatch } from "../app/store";
import { pendingTransactionsCount } from "../features/transactions-list/transactionsSlice";
import { ETH_DUMMY_ADDRESS } from "../lib/constants";

const StyledProgressButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.7rem;
`;

type ButtonProps = {
  requiresApproval?: boolean;
};

const Buttons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props: ButtonProps) => (props.requiresApproval ? 2 : 1)}, 1fr);
  grid-gap: 1.5rem;
  margin-bottom: ${(props: ButtonProps) => (props.requiresApproval ? "1rem" : "0")};
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ProgressSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type NumberProps = {
  current: boolean;
  complete: boolean;
};

const Number = styled.div`
  position: relative;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  background: ${(props: NumberProps) =>
    props.current ? "#C532F9" : props.complete ? "#16C784" : "#535068"};
  color: var(--main);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.4rem;
`;

const Tick = styled.img`
  height: 1.1rem;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  top: 50%;
  left: 0;
  transform: translate(50%, calc(-50% - 1px));
  background: ${(props: NumberProps) =>
    props.complete
      ? "linear-gradient(to right, #16C784, #C532F9)"
      : props.current
      ? "linear-gradient(to right, #C532F9, #535068)"
      : "#535068"};
`;

type Props = {
  value: number;
  deposit?: boolean;
  pool: Pool;
};

const ProgressButtons = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const approvedToDeposit = useSelector(selectDepositAllowance(props.pool));
  const pendingTxCount = useSelector(pendingTransactionsCount);
  const totalBalance = useSelector(selectBalance(props.pool));
  const staked = useSelector(selectBalance(props.pool.stakerVaultAddress));

  const availableToWithdraw = totalBalance - staked;
  const approved = approvedToDeposit >= props.value;
  const requiresApproval = props.deposit && props.pool.underlying.address !== ETH_DUMMY_ADDRESS;

  useEffect(() => {
    setLoading(pendingTxCount > 0);
  }, [pendingTxCount, setLoading]);

  const executeApprove = (amount: number) => {
    const approveAction = approve({
      token: props.pool.underlying,
      spender: props.pool.address,
      amount,
      backd: backd!,
    });
    dispatch(approveAction).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "approve" });
    });
  };

  const executeDeposit = (amount: number) => {
    dispatch(deposit({ backd: backd!, pool: props.pool, amount })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "deposit" });
    });
  };

  const executeWithdraw = (amount: number) => {
    dispatch(withdraw({ backd: backd!, pool: props.pool, amount })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "withdraw" });
    });
  };

  const executeUnstake = () => {
    dispatch(unstake({ backd: backd!, pool: props.pool, amount: staked })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "unstake" });
    });
  };

  return (
    <StyledProgressButtons>
      <Buttons requiresApproval={requiresApproval}>
        {requiresApproval && (
          <Button
            primary
            medium
            wide
            text={`Approve ${props.pool.underlying.symbol.toUpperCase()}`}
            click={() => {
              if (!approved) executeApprove(props.value);
            }}
            complete={approved}
            loading={loading && !approved}
          />
        )}
        <Button
          primary
          medium
          wide
          text={
            props.deposit
              ? "Deposit and Stake"
              : `Withdraw ${props.pool.underlying.symbol.toUpperCase()}`
          }
          click={() => {
            if (!backd) return;
            if (!approved) return;
            setLoading(true);
            if (props.deposit) executeDeposit(props.value);
            else if (props.value <= availableToWithdraw) executeWithdraw(props.value);
            else executeUnstake();
          }}
          disabled={!approved}
          loading={loading && approved}
        />
      </Buttons>
      {requiresApproval && (
        <ProgressContainer>
          <ProgressSection>
            <Line complete={approved} current={!approved} />
            <Number complete={approved} current={!approved}>
              {approved ? <Tick src={tick} /> : "1"}
            </Number>
          </ProgressSection>
          <ProgressSection>
            <Number complete={false} current={approved}>
              2
            </Number>
          </ProgressSection>
        </ProgressContainer>
      )}
    </StyledProgressButtons>
  );
};

export default ProgressButtons;
