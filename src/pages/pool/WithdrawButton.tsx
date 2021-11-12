import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "../../components/Button";
import { Pool } from "../../lib";
import { selectBalance, unstake, withdraw } from "../../state/userSlice";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import { ScaledNumber } from "../../lib/scaled-number";
import { hasPendingTransaction } from "../../state/transactionsSlice";
import WithdrawalConfirmation from "./WithdrawalConfirmation";

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
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const totalBalance = useSelector(selectBalance(pool));
  const staked = useSelector(selectBalance(pool.stakerVaultAddress));
  const loading = useSelector(hasPendingTransaction("Withdraw"));

  const [confirming, setConfirming] = useState(false);

  const availableToWithdraw = totalBalance.sub(staked);

  useEffect(() => {
    if (!loading) {
      setConfirming(false);
      complete();
    }
  }, [loading]);

  const executeWithdraw = (amount: ScaledNumber) => {
    if (!backd || loading) return;
    dispatch(withdraw({ backd, pool, amount }));
  };

  const executeUnstake = () => {
    if (!backd || loading) return;
    dispatch(unstake({ backd, pool, amount: staked }));
  };

  const submit = () => {
    if (!valid) return;
    if (value.lte(availableToWithdraw)) executeWithdraw(value);
    else executeUnstake();
  };

  return (
    <StyledProgressButtons>
      <Button
        id="withdraw-button"
        primary
        medium
        wide
        text={t("pool.tabs.withdraw.action", { asset: pool.underlying.symbol.toUpperCase() })}
        click={() => setConfirming(true)}
        disabled={!valid}
        hoverText={t("amountInput.enter")}
      />
      <WithdrawalConfirmation
        pool={pool}
        show={confirming}
        close={() => setConfirming(false)}
        submit={submit}
        value={value}
        loading={loading}
      />
    </StyledProgressButtons>
  );
};

export default WithdrawalButton;
