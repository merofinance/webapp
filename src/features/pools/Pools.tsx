import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BackdContext } from "../../app/providers/backd";
import { Pool } from "../../lib";
import { PoolCard } from "../pool-card/PoolCard";

export function Pools() {
  const backd = useContext(BackdContext);
  const [pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    if (!backd) return;
    (async () => {
      const pools = await backd.listPools();
      setPools(pools);
    })();
  }, [backd]);

  return (
    <>
      <header className="text-center m-4">
        <h1 className="display-3">Pools</h1>
      </header>
      <div className="table-header p-3">
        <Row>
          <Col></Col>
          <Col xs="2">Pool name</Col>
          <Col>Asset</Col>
          <Col>APY</Col>
          <Col xs="2">Total assets</Col>
          <Col xs="2">Balance</Col>
          <Col xs="3"></Col>
        </Row>
      </div>
      <div className="pools">
        {pools.map((pool) => (
          <div key={pool.name} className="mb-3">
            <PoolCard pool={pool} />
          </div>
        ))}
      </div>
    </>
  );
}
