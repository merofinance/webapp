import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import tokenImages from "../../images/tokens";
import dogeCoin from "../../images/tokens/dogecoin.png";
import { Pool } from "../../lib";
import styles from "./PoolCard.module.css";

export type PoolProps = {
  pool: Pool;
};

export function PoolCard({ pool }: PoolProps) {
  const image = pool.asset in tokenImages ? tokenImages[pool.asset] : dogeCoin;
  return (
    <div className={styles.row}>
      <Row>
        <Col>
          <img height="40" src={image} alt={`${pool.asset} logo`} />
        </Col>
        <Col xs="2">{pool.name}</Col>
        <Col>{pool.asset}</Col>
        <Col>{pool.apy.toString().slice(0, 4)}</Col>
        <Col xs="2">{pool.totalAssets.toString().slice(0, 8)}</Col>
        <Col xs="2">0</Col>
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
