import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "../../components/Button";
import { Pool } from "../../lib";
import {
  selectAvailableToWithdraw,
  selectPoolBalance,
  unstake,
  withdraw,
} from "../../state/userSlice";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import { ScaledNumber } from "../../lib/scaled-number";
import { hasPendingTransaction } from "../../state/transactionsSlice";

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
  const staked = useSelector(selectPoolBalance(pool.stakerVaultAddress));
  const loading = useSelector(hasPendingTransaction("Withdraw"));
  const availableToWithdraw = useSelector(selectAvailableToWithdraw(pool));

  useEffect(() => {
    if (!loading) complete();
  }, [loading]);

  const executeWithdraw = (amount: ScaledNumber) => {
    if (!backd || loading) return;
    dispatch(withdraw({ backd, pool, amount }));
  };

  const executeUnstake = () => {
    if (!backd || loading || !staked) return;
    dispatch(unstake({ backd, pool, amount: staked }));
  };

  return (
    <StyledProgressButtons>
      <Button
        id="withdraw-button"
        primary
        medium
        wide
        text={t("pool.tabs.withdraw.action", { asset: pool.underlying.symbol.toUpperCase() })}
        click={() => {
          if (!valid || !availableToWithdraw) return;
          if (value.lte(availableToWithdraw)) executeWithdraw(value);
          else executeUnstake();
        }}
        disabled={!valid}
        loading={loading}
        hoverText={t("amountInput.enter")}
      />
    </StyledProgressButtons>
  );
};

export default WithdrawalButton;
