import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ScaledNumber } from "scaled-number";

import { Pool } from "../../lib";
import { deposit } from "../../state/userSlice";
import { useMero } from "../../app/hooks/use-mero";
import { AppDispatch } from "../../app/store";
import ApproveThenAction from "../../components/ApproveThenAction";
import { hasPendingTransaction } from "../../state/transactionsSlice";
import Loader from "../../components/Loader";
import { Optional } from "../../lib/types";

interface Props {
  value: ScaledNumber;
  pool: Optional<Pool>;
  complete: () => void;
  valid: boolean;
  stepsOnTop?: boolean;
}

const DepositButtons = ({ value, pool, complete, valid, stepsOnTop }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const mero = useMero();
  const depositLoading = useSelector(hasPendingTransaction("Deposit"));

  useEffect(() => {
    if (!depositLoading) complete();
  }, [depositLoading]);

  const executeDeposit = () => {
    if (!mero || depositLoading || !pool) return;
    dispatch(deposit({ mero, pool, amount: value }));
  };

  return pool ? (
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
  ) : (
    <Loader button />
  );
};

export default DepositButtons;
