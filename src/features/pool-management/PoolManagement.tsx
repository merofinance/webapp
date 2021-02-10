import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";

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

  return (
    <Container>
      <header className="text-center m-4">
        <h1 className="display-3">Pool {poolName}</h1>
      </header>

      <main>
        <p>Some info about the pool</p>
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
