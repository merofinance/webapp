import React, { useContext, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BackdContext } from "../../app/providers/backd";
import { AppDispatch } from "../../app/store";
import { Pool } from "../../lib";
import { PoolRow } from "./PoolRow";
import {
  fetchState,
  selectBalances,
  selectPools,
  selectPrices,
} from "./poolsListSlice";
import styles from "./PoolsList.module.scss";
import classnames from "classnames";

export function PoolsList() {
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
    <Container>
      <header className="text-center m-4">
        <h1 className="display-3">Pools</h1>
      </header>
      <Table
        className={classnames(
          styles["no-border-headers"],
          styles["tall-lines"],
          styles["align-cells-middle"]
        )}
      >
        <thead>
          <tr>
            <th></th>
            <th>Pool name</th>
            <th>Asset</th>
            <th>APY</th>
            <th>Total assets</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool) => (
            <PoolRow
              key={pool.name}
              pool={pool}
              balance={getBalance(pool)}
              price={getPrice(pool)}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
