import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { useBackd } from "../../app/hooks/use-backd";
import { useLoading } from "../../app/hooks/use-loading";
import { AppDispatch } from "../../app/store";
import { ButtonSpinner } from "../../components/button-spinner/ButtonSpinner";
import { EthAddress } from "../../components/eth-address/EthAddress";
import { Pool, Position } from "../../lib/types";
import { ConfirmRemovePositionModal } from "./ConfirmRemovePositionModal";
import styles from "./Positions.module.scss";
import { removePosition } from "./positionsSlice";

type PositionRowProps = {
  position: Position;
  pool: Pool;
};

export function PositionRow({ position, pool }: PositionRowProps) {
  const backd = useBackd();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const { loading, setLoading, handleTxDispatch } = useLoading();
  const dispatch: AppDispatch = useDispatch();

  const handleRemovePosition = () => {
    if (!backd) return;

    setLoading(true);
    setShowRemoveModal(false);
    dispatch(removePosition({ backd, pool, position })).then((v) => {
      handleTxDispatch({ status: v.meta.requestStatus, actionType: "remove" });
    });
  };

  return (
    <div className={styles["table-row"]}>
      <div className={styles["table-cell"]}>{position.protocol}</div>
      <div className={styles["table-cell"]}>
        <EthAddress truncate="middle" value={position.account} maxLength={16} />
      </div>
      <div className={styles["table-cell"]}>{position.threshold}</div>
      <div className={styles["table-cell"]}>
        <NumberFormat
          displayType={"text"}
          value={position.singleTopUp}
          thousandSeparator={true}
          suffix={` ${pool.underlying.symbol}`}
        />
      </div>
      <div className={styles["table-cell"]}>
        <NumberFormat
          displayType={"text"}
          value={position.totalTopUp}
          thousandSeparator={true}
          suffix={` ${pool.underlying.symbol}`}
        />
      </div>
      <div className={styles["table-cell"]}>
        <Button disabled={loading} size="sm" onClick={() => setShowRemoveModal(true)}>
          {loading ? <ButtonSpinner show={loading} /> : <FontAwesomeIcon icon="trash-alt" />}
        </Button>
      </div>
      <ConfirmRemovePositionModal
        position={position}
        show={showRemoveModal}
        handleClose={() => setShowRemoveModal(false)}
        handleConfirm={handleRemovePosition}
      />
    </div>
  );
}
