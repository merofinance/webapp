import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BackdContext } from "../../app/providers/backd";
import { AppDispatch } from "../../app/store";
import { Pool } from "../../lib";
import { PoolCard } from "../pool-card/PoolCard";
import {
  fetchState,
  selectBalances,
  selectPools,
  selectPrices,
} from "./poolsSlice";

export function Pools() {
  const backd = useContext(BackdContext);
  const dispatch: AppDispatch = useDispatch();
  const pools = useSelector(selectPools);
  const prices = useSelector(selectPrices);
  const balances = useSelector(selectBalances);

  const getBalance = (pool: Pool) => balances[pool.name] || 0;
  const getPrice = (pool: Pool) => prices[pool.asset] || 0;

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [backd, dispatch]);

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
            <PoolCard
              pool={pool}
              balance={getBalance(pool)}
              price={getPrice(pool)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
