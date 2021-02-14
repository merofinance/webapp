import { RootState } from "../../app/store";
import { Optional, Pool } from "../../lib/types";

export function selectPool(
  poolName: string
): (state: RootState) => Optional<Pool> {
  return (state: RootState) =>
    state.pools.pools.find((p) => p.name === poolName) || null;
}

export function selectBalance(
  pool: Optional<Pool>
): (state: RootState) => number {
  return (state: RootState) =>
    (pool && state.pools.userBalances[pool.name]) || 0;
}

export function selectPrice(
  pool: Optional<Pool>
): (state: RootState) => number {
  return (state: RootState) => (pool && state.pools.prices[pool.asset]) || 0;
}
