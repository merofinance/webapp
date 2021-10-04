import React from "react";
import { useParams } from "react-router";
import RegisterTopupConditions from "./RegisterTopupConditions";
import RegisterTopupLoan from "./RegisterTopupLoan";
import RegisterTopupPool from "./RegisterTopupPool";

interface TopupParams {
  address: string;
  protocol: string;
  poolName: string;
}

const RegisterTopup = () => {
  const { address, protocol, poolName } = useParams<TopupParams>();
  if (!address || !protocol) return <RegisterTopupLoan />;
  if (!poolName) return <RegisterTopupPool />;
  return <RegisterTopupConditions />;
};

export default RegisterTopup;
