import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useMero } from "./use-mero";

export function useWeb3Updated(): number {
  const { account, chainId } = useWeb3React();
  const mero = useMero();
  const [updated, setUpdated] = useState(0);

  useEffect(() => {
    setUpdated(updated + 1);
    return () => {
      setUpdated(0);
    };
  }, [account, chainId, mero]);

  return updated;
}
