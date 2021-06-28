import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useBackd } from "../../app/hooks/use-backd";
import { useLoading } from "../../app/hooks/use-loading";
import { AppDispatch } from "../../app/store";
import AmountInput from "../../components/AmountInput";
import ContentSection from "../../components/ContentSection";
import ProgressButtons from "../../components/ProgressButtons";
import { pendingTransactionsCount } from "../../features/transactions-list/transactionsSlice";
import {
  approve,
  deposit,
  selectBalance,
  selectDepositAllowance,
} from "../../features/user/userSlice";
import { Pool } from "../../lib";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Props = {
  pool: Pool;
};

const PoolDeposit = (props: Props) => {
  const backd = useBackd();
  const dispatch: AppDispatch = useDispatch();
  const [submitText, setSubmitText] = useState("Deposit");
  console.log(props.pool.underlying.address);
  const availableToDeposit = useSelector(selectBalance(props.pool.underlying.address));
  console.log(availableToDeposit);
  const approvedToDeposit = useSelector(selectDepositAllowance(props.pool));
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
    const approveAction = approve({
      token: props.pool.underlying,
      spender: props.pool.address,
      amount,
      backd,
    });
    dispatch(approveAction).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "approve" });
    });
  };

  const executeDeposit = (amount: number) => {
    if (!backd) return;
    setLoading(true);
    dispatch(deposit({ backd, pool: props.pool, amount })).then((v) => {
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
    <ContentSection
      header={`Deposit ${props.pool.underlying.symbol.toUpperCase()}`}
      statistics={[
        {
          header: "Your deposits",
          value: "$130,000.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
        {
          header: "Locked in position",
          value: "$90,000.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
        {
          header: "Rewards accrued",
          value: "$14,000.00",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
        },
      ]}
      content={
        <Content>
          <AmountInput label="Enter an amount of USDC to deposit" max={availableToDeposit} />
          <ProgressButtons token={""} symbol={"dai"} buttonText="Deposit and Stake" />
        </Content>
      }
    />
  );
};

export default PoolDeposit;
