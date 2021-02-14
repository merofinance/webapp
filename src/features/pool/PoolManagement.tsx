import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getImage } from "../../images/tokens";
import { Deposit } from "./actions/Deposit";
import { Positions } from "./actions/Positions";
import { Withdraw } from "./actions/Withdraw";
import { PoolInfo } from "./PoolInfo";
import { selectBalance, selectPool, selectPrice } from "./selectors";

type DepositWithdrawParams = {
  poolName: string;
};

type Mode = "deposit" | "withdraw" | "positions";
type DepositWithdrawParamsProps = {
  mode: Mode;
};

export function PoolManagement({
  mode: initialMode,
}: DepositWithdrawParamsProps) {
  let { poolName } = useParams<DepositWithdrawParams>();
  const [mode, setMode] = useState<Mode>(initialMode);
  const pool = useSelector(selectPool(poolName));
  const balance = useSelector(selectBalance(pool));
  const price = useSelector(selectPrice(pool));

  if (!pool) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <header className="text-center m-4">
        <h1 className="display-4">
          <img
            className="mr-2"
            height="50"
            src={getImage(pool)}
            alt={`${pool.asset} logo`}
          />
          {pool.name}
        </h1>
      </header>

      <main>
        <PoolInfo pool={pool} balance={balance} price={price} />

        <Tabs
          activeKey={mode}
          onSelect={(k) => setMode((k as unknown) as Mode)}
        >
          <Tab eventKey="deposit" title="Deposit">
            <Deposit pool={pool} />
          </Tab>
          <Tab eventKey="withdraw" title="Withdraw">
            <Withdraw pool={pool} />
          </Tab>
          <Tab eventKey="positions" title="Positions">
            <Positions pool={pool} />
          </Tab>
        </Tabs>
      </main>
    </Container>
  );
}
