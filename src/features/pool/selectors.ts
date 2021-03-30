import { Selector } from "reselect";
import { RootState } from "../../app/store";
import { Optional, Pool } from "../../lib/types";

export function selectPool(poolName: string): (state: RootState) => Optional<Pool> {
  return (state: RootState) => state.pools.pools.find((p) => p.lpToken.symbol === poolName) || null;
}

function getAddress(addressOrPool: string | Optional<Pool>): Optional<string> {
  if (typeof addressOrPool === "string") {
    return addressOrPool;
  }
  return addressOrPool?.lpToken.address || null;
}

export function selectBalance(pool: Optional<Pool>): Selector<RootState, number>;
export function selectBalance(address: string): Selector<RootState, number>;
export function selectBalance(addressOrPool: string | Optional<Pool>): Selector<RootState, number> {
  return (state: RootState) => {
    const address = getAddress(addressOrPool);
    return (address && state.user.balances[address]) || 0;
  };
}

export function selectPrice(pool: Optional<Pool>): Selector<RootState, number> {
  return (state: RootState) => (pool && state.pools.prices[pool.underlying.symbol]) || 0;
}
