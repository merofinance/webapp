import React, { useState } from "react";
import { Col, Container, Row, Tab, Table, Tabs } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import { getImage } from "../../images/tokens";
import { Pool } from "../../lib";
import { Optional } from "../../lib/types";
import { AssetAmount } from "../asset-amount/AssetAmount";

type DepositWithdrawParams = {
  poolName: string;
};

type Mode = "deposit" | "withdraw" | "positions";
type DepositWithdrawParamsProps = {
  mode: Mode;
};

function usePool(poolName: string): Optional<Pool> {
  return useSelector((state: RootState) => {
    return state.pools.pools.find((p) => p.name === poolName) || null;
  });
}

const useBalance = (pool: Optional<Pool>) =>
  useSelector(
    (state: RootState) => (pool && state.pools.userBalances[pool.name]) || 0
  );

const usePrice = (pool: Optional<Pool>) =>
  useSelector(
    (state: RootState) => (pool && state.pools.prices[pool.asset]) || 0
  );

export function PoolManagement({
  mode: initialMode,
}: DepositWithdrawParamsProps) {
  let { poolName } = useParams<DepositWithdrawParams>();
  const [mode, setMode] = useState<Mode>(initialMode);
  const pool = usePool(poolName);
  const balance = useBalance(pool);
  const price = usePrice(pool);

  if (!pool) {
    return <Redirect to="/app" />;
  }

  return (
    <Container>
      <header className="text-center m-4">
        <h1 className="display-3">
          <img height="40" src={getImage(pool)} alt={`${pool.asset} logo`} />
          {pool.name}
        </h1>
      </header>

      <main>
        <h2 className="text-center">
          <AssetAmount
            asset={pool.asset}
            amount={pool.totalAssets}
            price={price}
            newLine={true}
          />
        </h2>

        <Row>
          <Col xs={6}>
            <Table borderless={true}>
              <thead>
                <tr>
                  <th>Balance</th>
                  <th>APY</th>
                </tr>
              </thead>
              <tbody>
                <td>
                  <AssetAmount
                    asset={pool.asset}
                    amount={balance}
                    price={price}
                    parenthesis={true}
                  />
                </td>
                <td>
                  <NumberFormat
                    displayType={"text"}
                    value={pool.apy}
                    suffix="%"
                  />
                </td>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Tabs
          activeKey={mode}
          onSelect={(k) => setMode((k as unknown) as Mode)}
        >
          <Tab eventKey="deposit" title="Deposit">
            <p>Deposit</p>
          </Tab>
          <Tab eventKey="withdraw" title="Withdraw">
            <p>Withdraw</p>
          </Tab>
          <Tab eventKey="positions" title="Positions">
            <p>Positions</p>
          </Tab>
        </Tabs>
      </main>
    </Container>
  );
}
