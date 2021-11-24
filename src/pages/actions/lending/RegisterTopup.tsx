import React from "react";
import { useMatch } from "react-router-dom";
import RegisterTopupConditions from "./RegisterTopupConditions";
import RegisterTopupLoan from "./RegisterTopupLoan";
import RegisterTopupPool from "./RegisterTopupPool";
import RegisterTopupPoolDeposit from "./RegisterTopupPoolDeposit";

const RegisterTopup = (): JSX.Element => {
  const poolDepositFull = useMatch("/deposit/:poolName/:address/:protocol");
  const poolDeposit = useMatch("/deposit/:poolName");
  const conditions = useMatch("/:address/:protocol/:poolName");
  const pool = useMatch("/:address/:protocol");

  if (poolDepositFull || poolDeposit) return <RegisterTopupPoolDeposit />;
  if (conditions) return <RegisterTopupConditions />;
  if (pool) return <RegisterTopupPool />;
  return <RegisterTopupLoan />;
};

export default RegisterTopup;
