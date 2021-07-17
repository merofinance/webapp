import React from "react";
import styled from "styled-components";
import Button from "./Button";
import tick from "../assets/ui/tick.svg";
import { Pool } from "../lib";
import { useLoading } from "../app/hooks/use-loading";
import { approve, deposit, selectDepositAllowance } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../app/hooks/use-backd";
import { AppDispatch } from "../app/store";
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
  pool: Pool;
  complete: () => void;
};

const DepositButtons = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const approvedToDeposit = useSelector(selectDepositAllowance(props.pool));

  const approved = approvedToDeposit >= props.value;
  const requiresApproval = props.pool.underlying.address !== ETH_DUMMY_ADDRESS;

  const executeApprove = (amount: number) => {
    if (approved) return;
    setLoading(true);
    const approveAction = approve({
      token: props.pool.underlying,
      spender: props.pool.address,
      amount,
      backd: backd!,
    });
    dispatch(approveAction).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "approve" });
      setLoading(false);
    });
  };

  const executeDeposit = (amount: number) => {
    setLoading(true);
    dispatch(deposit({ backd: backd!, pool: props.pool, amount })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "deposit" });
      props.complete();
      setLoading(false);
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
            click={() => executeApprove(props.value)}
            complete={approved}
            loading={loading && !approved}
            disabled={props.value === 0}
            hoverText={props.value === 0 ? "Enter Amount" : ""}
          />
        )}
        <Button
          primary
          medium
          wide
          text={"Deposit and Stake"}
          click={() => executeDeposit(props.value)}
          disabled={!approved || props.value === 0}
          loading={loading && approved}
          hoverText={
            props.value === 0
              ? "Enter Amount"
              : !approved
              ? `Approve ${props.pool.underlying.symbol.toUpperCase()}`
              : ""
          }
        />
      </Buttons>
      {requiresApproval && (
        <ProgressContainer>
          <ProgressSection>
            <Line
              complete={approved && props.value !== 0}
              current={!approved && props.value !== 0}
            />
            <Number
              complete={approved && props.value !== 0}
              current={!approved && props.value !== 0}
            >
              {approved && props.value !== 0 ? <Tick src={tick} alt="tick" /> : "1"}
            </Number>
          </ProgressSection>
          <ProgressSection>
            <Number complete={false} current={approved && props.value !== 0}>
              2
            </Number>
          </ProgressSection>
        </ProgressContainer>
      )}
    </StyledProgressButtons>
  );
};

export default DepositButtons;
