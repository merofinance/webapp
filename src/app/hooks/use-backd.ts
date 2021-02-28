import { useWeb3React } from "@web3-react/core";
import { Backd } from "../../lib/backd";

export function useBackd(): Backd | undefined {
  const { library: backd } = useWeb3React<Backd>();
  return backd;
}
