import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useBackd } from "./use-backd";

export function useWeb3Updated(): number {
  const { account, chainId } = useWeb3React();
  const backd = useBackd();
  const [updated, setUpdated] = useState(0);

  useEffect(() => {
    setUpdated(updated + 1);
  }, [account, chainId, backd]);

  return updated;
}
