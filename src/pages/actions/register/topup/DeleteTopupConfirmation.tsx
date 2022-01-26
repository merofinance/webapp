import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { useBackd } from "../../../../app/hooks/use-backd";
import { AppDispatch } from "../../../../app/store";
import Popup from "../../../../components/Popup";
import { Position, Pool, TransactionInfo, fromPlainPosition } from "../../../../lib/types";
import { removePosition } from "../../../../state/positionsSlice";
import { selectTransactions } from "../../../../state/transactionsSlice";

interface Props {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
  complete: () => void;
}

const DeleteTopupConfirmation = ({ show, close, position, pool, complete }: Props): JSX.Element => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch<AppDispatch>();
  const [initialised, setInitialised] = useState(false);
  const pendingTx = useSelector(selectTransactions);

  const loading = pendingTx.some(
    (tx: TransactionInfo) =>
      tx.confirmations === 0 &&
      tx.description.action === "Remove" &&
      fromPlainPosition(tx.description.args?.plainPosition).account === position.account &&
      fromPlainPosition(tx.description.args?.plainPosition).protocol === position.protocol
  );

  useEffect(() => {
    if (initialised && !loading) {
      complete();
      close();
    }
    setInitialised(true);
    return () => {
      setInitialised(false);
    };
  }, [loading]);

  const handleRemovePosition = () => {
    if (!backd) return;
    dispatch(removePosition({ backd, pool, position }));
  };

  return (
    <Popup
      id="delete-topup-confirmation"
      show={show}
      close={close}
      header={t("actions.topup.delete.header")}
      body={t("actions.topup.delete.body", {
        asset: pool.underlying.symbol,
        max: position.maxTopUp.toCryptoString(),
        protocol: position.protocol,
      })}
      loading={loading}
      confirm
      submit={handleRemovePosition}
      confirmationText={t("actions.topup.delete.header")}
    />
  );
};

export default DeleteTopupConfirmation;
