import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Pool } from "../../lib";
import { deposit } from "../../state/userSlice";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import ApproveThenAction from "../../components/ApproveThenAction";
import { ScaledNumber } from "../../lib/scaled-number";
import { hasPendingTransaction } from "../../state/transactionsSlice";

interface Props {
  value: ScaledNumber;
  pool: Pool;
  complete: () => void;
  valid: boolean;
  stepsOnTop?: boolean;
}

const DepositButtons = ({ value, pool, complete, valid, stepsOnTop }: Props): JSX.Element => {
  const { t } = useTranslation();
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
    <ApproveThenAction
      label={t("pool.tabs.deposit.action")}
      action={executeDeposit}
      value={value}
      loading={depositLoading}
      disabled={!valid}
      token={pool.underlying}
      contract={pool.address}
      stepsOnTop={stepsOnTop}
    />
  );
};

export default DepositButtons;
