import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../../../app/hooks/use-backd";
import { AppDispatch } from "../../../app/store";
import Popup from "../../../components/Popup";
import { Position, Pool, TransactionInfo } from "../../../lib/types";
import { removePosition } from "../../../state/positionsSlice";
import { selectTransactions } from "../../../state/transactionsSlice";

interface Props {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
  complete: () => void;
}

const DeletePositionConfirmation = ({ show, close, position, pool, complete }: Props) => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch<AppDispatch>();
  const [initialised, setInitialised] = useState(false);
  const pendingTx = useSelector(selectTransactions);

  const loading = pendingTx.some(
    (tx: TransactionInfo) =>
      tx.confirmations === 0 &&
      tx.description.action === "Remove" &&
      tx.description.args?.position.account === position.account &&
      tx.description.args?.position.protocol === position.protocol
  );

  useEffect(() => {
    if (initialised && !loading) {
      complete();
      close();
    }
    setInitialised(true);
  }, [loading]);

  const handleRemovePosition = () => {
    if (!backd) return;
    dispatch(removePosition({ backd, pool, position }));
  };

  return (
    <Popup
      show={show}
      close={close}
      header={t("pool.tabs.positions.delete.header")}
      body={t("pool.tabs.positions.delete.body", {
        asset: pool.underlying.symbol,
        max: position.maxTopUp.toCryptoString(),
        protocol: position.protocol,
      })}
      confirm
      submit={() => handleRemovePosition()}
      loading={loading}
    />
  );
};

export default DeletePositionConfirmation;
