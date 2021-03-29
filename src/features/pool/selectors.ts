import { RootState } from "../../app/store";
import { Optional, Pool } from "../../lib/types";

export function selectPool(
  poolName: string
): (state: RootState) => Optional<Pool> {
  return (state: RootState) =>
    state.pools.pools.find((p) => p.lpToken.symbol === poolName) || null;
}

export function selectBalance(
  pool: Optional<Pool>
): (state: RootState) => number {
  return (state: RootState) =>
    (pool && state.user.balances[pool.lpToken.symbol]) || 0;
}

export function selectPrice(
  pool: Optional<Pool>
): (state: RootState) => number {
  return (state: RootState) =>
    (pool && state.pools.prices[pool.underlying.symbol]) || 0;
}
