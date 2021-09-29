import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import Popup from "../../components/Popup";
import { Position, Pool } from "../../lib/types";
import { removePosition } from "../../state/positionsSlice";

interface Props {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
  loading: boolean;
}

const DeletePositionConfirmation = ({ show, close, position, pool, loading }: Props) => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch: AppDispatch = useDispatch();

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
