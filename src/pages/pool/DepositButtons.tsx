import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Pool } from "../../lib";
import { useLoading } from "../../app/hooks/use-loading";
import { approve, deposit, selectDepositAllowance } from "../../state/userSlice";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import MultiStepButtons from "../../components/MultiStepButtons";
import { ETH_DUMMY_ADDRESS, INFINITE_APPROVE_AMMOUNT } from "../../lib/constants";
import Button from "../../components/Button";
import { ScaledNumber } from "../../lib/scaled-number";

type Props = {
  value: ScaledNumber;
  pool: Pool;
  complete: () => void;
};

const DepositButtons = ({ value, pool, complete }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const backd = useBackd();
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const approvedToDeposit = useSelector(selectDepositAllowance(pool));
  const approved = approvedToDeposit.gte(value);

  const executeApprove = async () => {
    if (!backd || approved) return;
    const approveAction = approve({
      token: pool.underlying,
      spender: pool.address,
      amount: ScaledNumber.fromUnscaled(INFINITE_APPROVE_AMMOUNT),
      backd,
    });
    const v = await dispatch(approveAction);
    handleTxDispatch({ status: v.meta.requestStatus, actionType: "approve" });
  };

  const executeDeposit = async () => {
    if (!backd || !approved) return;
    const v = await dispatch(deposit({ backd, pool, amount: value }));
    handleTxDispatch({ status: v.meta.requestStatus, actionType: "deposit" });
    complete();
  };

  return (
    <>
      {pool.underlying.address !== ETH_DUMMY_ADDRESS && (
        <MultiStepButtons
          disabled={value.isZero()}
          firstText={t("amountInput.approve", pool.underlying.symbol)}
          firstAction={executeApprove}
          firstComplete={approved}
          firstHoverText={t("amountInput.enter")}
          secondText={t("pool.tabs.deposit.action")}
          secondAction={executeDeposit}
          secondHoverText={t("amountInput.approve", pool.underlying.symbol)}
        />
      )}
      {pool.underlying.address === ETH_DUMMY_ADDRESS && (
        <Button
          primary
          medium
          wide
          text={t("pool.tabs.deposit.action")}
          click={async () => {
            setLoading(true);
            await executeDeposit();
            setLoading(false);
          }}
          disabled={value.isZero()}
          loading={loading}
          hoverText={t("amountInput.enter")}
        />
      )}
    </>
  );
};

export default DepositButtons;
