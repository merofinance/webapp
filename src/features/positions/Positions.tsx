import React, { useContext, useEffect } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { BackdContext } from "../../app/providers/backd";
import { AppDispatch } from "../../app/store";
import { EthAddress } from "../../components/eth-address/EthAddress";
import { Pool } from "../../lib";
import { NewPositionRow } from "./NewPositionRow";
import styles from "./Positions.module.scss";
import { fetchPositions, selectPositions } from "./positionsSlice";

type PositionsProps = {
  pool: Pool;
};

export function Positions({ pool }: PositionsProps) {
  const positions = useSelector(selectPositions(pool));
  const dispatch = useDispatch<AppDispatch>();
  const backd = useContext(BackdContext);

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchPositions(backd, pool));
  }, [backd, dispatch, pool]);

  return (
    <>
      <div className="text-center">
        <h5>Positions</h5>
      </div>

      <div className={styles.table}>
        <div className={styles.thead}>
          <div className={styles["table-row"]}>
            <div className={styles["table-cell"]}>Protocol</div>
            <div className={styles["table-cell"]}>Borrower</div>
            <div className={styles["table-cell"]}>Threshold</div>
            <div className={styles["table-cell"]}>Single topup</div>
            <div className={styles["table-cell"]}>Total topup</div>
            <div className={styles["table-cell"]}></div>
          </div>
        </div>
        <div className={styles.tbody}>
          {positions.map((position) => {
            return (
              <div className={styles["table-row"]} key={position.key}>
                <div className={styles["table-cell"]}>{position.protocol}</div>
                <div className={styles["table-cell"]}>
                  <EthAddress
                    truncate="middle"
                    value={position.account}
                    maxLength={16}
                  />
                </div>
                <div className={styles["table-cell"]}>{position.threshold}</div>
                <div className={styles["table-cell"]}>
                  <NumberFormat
                    displayType={"text"}
                    value={position.singleTopUp}
                    thousandSeparator={true}
                    suffix={` ${pool.asset}`}
                  />
                </div>
                <div className={styles["table-cell"]}>
                  <NumberFormat
                    displayType={"text"}
                    value={position.totalTopUp}
                    thousandSeparator={true}
                    suffix={` ${pool.asset}`}
                  />
                </div>
                <div className={styles["table-cell"]}></div>
              </div>
            );
          })}
          <NewPositionRow />
        </div>
      </div>
    </>
  );
}
