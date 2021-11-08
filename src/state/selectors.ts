import { useSelector } from "react-redux";
import { Selector } from "reselect";
import { RootState } from "../app/store";
import { ScaledNumber } from "../lib/scaled-number";
import { Optional, Pool, Position } from "../lib/types";
import { selectPoolPositions } from "./positionsSlice";
import { selectBalance } from "./userSlice";

export function selectPool(poolName: string): (state: RootState) => Optional<Pool> {
  return (state: RootState) =>
    state.pools.pools.find((p) => p.lpToken.symbol.toLowerCase() === poolName.toLowerCase()) ||
    null;
}

export function getAddress(addressOrPool: string | Optional<Pool>): Optional<string> {
  if (typeof addressOrPool === "string") {
    return addressOrPool;
  }
  return addressOrPool?.lpToken.address || null;
}

export function selectPrice(pool: Optional<Pool>): Selector<RootState, number | undefined> {
  return (state: RootState) => (pool ? state.pools.prices[pool.underlying.symbol] : undefined);
}

export function selectLocked(pool: Optional<Pool>): Selector<RootState, ScaledNumber | undefined> {
  return (state: RootState) => {
    if (!pool) return undefined;
    const positions = useSelector(selectPoolPositions(pool));
    return positions.reduce(
      (a: ScaledNumber, b: Position) => a.add(b.maxTopUp),
      new ScaledNumber()
    );
  };
}

export function selectDeposits(
  pool: Optional<Pool>
): Selector<RootState, ScaledNumber | undefined> {
  return (state: RootState) => {
    if (!pool) return undefined;
    const locked = useSelector(selectLocked(pool));
    const balance = useSelector(selectBalance(pool));
    if (!locked || !balance) return undefined;
    return locked.add(balance);
  };
}
