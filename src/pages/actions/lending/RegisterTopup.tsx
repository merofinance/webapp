import React from "react";
import { useParams } from "react-router";
import RegisterTopupConditions from "./RegisterTopupConditions";
import RegisterTopupLoan from "./RegisterTopupLoan";
import RegisterTopupPool from "./RegisterTopupPool";

interface TopupParams {
  address: string;
  protocol: string;
  pool: string;
}

const RegisterTopup = () => {
  const { address, protocol, pool } = useParams<TopupParams>();
  if (!address || !protocol) return <RegisterTopupLoan />;
  if (!pool) return <RegisterTopupPool />;
  return <RegisterTopupConditions />;
};

export default RegisterTopup;
