import { useWeb3React } from "@web3-react/core";
import { Mero } from "../../lib/mero";

export function useMero(): Mero | undefined {
  const { library: mero } = useWeb3React<Mero>();
  return mero;
}
