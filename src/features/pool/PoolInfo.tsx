import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { AssetAmount } from "../../components/asset-amount/AssetAmount";
import { Pool } from "../../lib";
import styles from "./Pool.module.scss";

type PoolInfoProps = {
  pool: Pool;
  price: number;
  balance: number;
};

export function PoolInfo({ pool, price, balance }: PoolInfoProps) {
  return (
    <Row className="mb-5">
      <Col xs={{ span: 2, offset: 3 }}>
        <Card className={styles.info}>
          <Card.Header>Supply</Card.Header>
          <Card.Body>
            <Card.Title>
              <AssetAmount
                asset={pool.asset}
                amount={pool.totalAssets}
                price={price}
                newLine={true}
              />
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={2}>
        <Card className={styles.info}>
          <Card.Header>Balance</Card.Header>
          <Card.Body>
            <Card.Title>
              <AssetAmount
                asset={pool.asset}
                amount={balance}
                price={price}
                newLine={true}
              />
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={2}>
        <Card className={styles.info}>
          <Card.Header>APY</Card.Header>
          <Card.Body>
            <Card.Title className={styles["info-tall-body"]}>
              <NumberFormat displayType={"text"} value={pool.apy} suffix="%" />
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
