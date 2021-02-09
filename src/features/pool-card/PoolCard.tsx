import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import NumberFormat from "react-number-format";
import tokenImages from "../../images/tokens";
import dogeCoin from "../../images/tokens/dogecoin.png";
import { Pool } from "../../lib";
import styles from "./PoolCard.module.css";

export type PoolProps = {
  pool: Pool;
  balance: number;
  price: number;
};

export function PoolCard({ pool, balance, price }: PoolProps) {
  const image = pool.asset in tokenImages ? tokenImages[pool.asset] : dogeCoin;
  const totalUSD = Math.round(pool.totalAssets * price);

  return (
    <div className={styles.row}>
      <Row>
        <Col>
          <img height="40" src={image} alt={`${pool.asset} logo`} />
        </Col>
        <Col xs="2">{pool.name}</Col>
        <Col>{pool.asset}</Col>
        <Col>
          <NumberFormat displayType={"text"} value={pool.apy} suffix="%" />
        </Col>
        <Col xs="2">
          <NumberFormat
            displayType={"text"}
            value={totalUSD}
            thousandSeparator={true}
            prefix="$"
          />

          <br />
          <small>
            <NumberFormat
              displayType={"text"}
              value={pool.totalAssets}
              thousandSeparator={true}
              suffix={` ${pool.asset}`}
            />
          </small>
        </Col>
        <Col xs="2">
          <NumberFormat
            displayType={"text"}
            value={balance}
            thousandSeparator={true}
          />
        </Col>
        <Col>
          <Button size="sm" variant="secondary">
            Deposit
          </Button>
        </Col>
        <Col>
          <Button size="sm" variant="secondary">
            Positions
          </Button>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
