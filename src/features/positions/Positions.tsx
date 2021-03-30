import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useBackd } from "../../app/hooks/use-backd";
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
  const backd = useBackd();

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
            <div className={styles["table-cell"]}>
              Protocol
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="protocol-tooltip">
                    Protocol in which to monitor positions and topup
                  </Tooltip>
                }
              >
                <FontAwesomeIcon icon="info-circle" />
              </OverlayTrigger>
            </div>
            <div className={styles["table-cell"]}>
              Borrower
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="borrower-tooltip">
                    The borrower for which the position should be topped up if it drops below the
                    threshold.
                  </Tooltip>
                }
              >
                <FontAwesomeIcon icon="info-circle" />
              </OverlayTrigger>
            </div>
            <div className={styles["table-cell"]}>
              Threshold
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="threshold-tooltip">
                    The collaterization ratio threshold (&gt; 1) under which the position should be
                    topped up. See documentation for details about how the collaterization ratio is
                    computed.
                  </Tooltip>
                }
              >
                <FontAwesomeIcon icon="info-circle" />
              </OverlayTrigger>
            </div>
            <div className={styles["table-cell"]}>
              Single topup
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="single-topup-tooltip">
                    Single topup is the amount that can should be topped up when the position drops
                    below the given threshold.
                  </Tooltip>
                }
              >
                <FontAwesomeIcon icon="info-circle" />
              </OverlayTrigger>
            </div>
            <div className={styles["table-cell"]}>
              Total topup
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="total-topup-tooltip">
                    Total topup is the total amount, potentially spread across multiple topups, that
                    can be topped up for this position. This amount should first be deposited in the
                    pool.
                  </Tooltip>
                }
              >
                <FontAwesomeIcon icon="info-circle" />
              </OverlayTrigger>
            </div>
            <div className={styles["table-cell"]}></div>
          </div>
        </div>
        <div className={styles.tbody}>
          {positions.map((position) => {
            return (
              <div className={styles["table-row"]} key={position.key}>
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
                <div className={styles["table-cell"]}></div>
              </div>
            );
          })}
          <NewPositionRow pool={pool} />
        </div>
      </div>
    </>
  );
}
