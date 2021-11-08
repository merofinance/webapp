import { useSelector } from "react-redux";
import { Selector } from "reselect";
import { RootState } from "../app/store";
import { ScaledNumber } from "../lib/scaled-number";
import { Optional, Pool, Position } from "../lib/types";
import { selectPools, selectPrices } from "./poolsListSlice";
import { selectPoolPositions, selectPositions } from "./positionsSlice";
import { selectBalance, selectBalances } from "./userSlice";

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

export function selectPrice(pool: Optional<Pool>): Selector<RootState, number | null> {
  return (state: RootState) => (pool ? state.pools.prices[pool.underlying.symbol] : null);
}

export function selectLocked(pool: Optional<Pool>): Selector<RootState, ScaledNumber | undefined> {
  return (state: RootState) => {
    if (!pool) return undefined;
    const positions = useSelector(selectPoolPositions(pool));
    if (!positions) return undefined;
    return positions.reduce(
      (a: ScaledNumber, b: Position) => a.add(b.maxTopUp),
      new ScaledNumber()
    );
  };
}

export function selectPoolTotalLocked(
  pool: Pool | null
): Selector<RootState, ScaledNumber | undefined> {
  return (state: RootState) => {
    const prices = useSelector(selectPrices);
    const balances = useSelector(selectBalances);
    const positions = useSelector(selectPositions);

    if (!pool || !prices || !balances || !positions) return undefined;

    let total = new ScaledNumber();
    positions.forEach((position: Position) => {
      const price = prices[pool.underlying.symbol];
      if (!price) return undefined;
      total = total.add(position.maxTopUp.mul(price));
    });
    return total;
  };
}

export function selectTotalLocked(): Selector<RootState, ScaledNumber | undefined> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const prices = useSelector(selectPrices);
    const balances = useSelector(selectBalances);
    const positions = useSelector(selectPositions);

    if (!pools || !prices || !balances || !positions) return undefined;

    let total = new ScaledNumber();
    positions.forEach((position: Position) => {
      const pool = pools.filter(
        (pool: Pool) => pool.underlying.address === position.actionToken
      )[0];
      if (!pool) return undefined;
      const price = prices[pool.underlying.symbol];
      if (!price) return undefined;
      total = total.add(position.maxTopUp.mul(price));
    });
    return total;
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

export function selectTotalBalance(): Selector<RootState, ScaledNumber | undefined> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const prices = useSelector(selectPrices);
    const balances = useSelector(selectBalances);
    const positions = useSelector(selectPositions);

    if (!pools || !prices || !balances || !positions) return undefined;

    let total = new ScaledNumber();
    pools.forEach((pool: Pool) => {
      const balance = balances[pool.lpToken.address];
      const price = prices[pool.underlying.symbol];
      if (!price || !balance) return undefined;
      total = total.add(balance.mul(price));
    });
    return total;
  };
}

export function selectTotalDeposits(): Selector<RootState, ScaledNumber | undefined> {
  return (state: RootState) => {
    const totalLocked = useSelector(selectTotalLocked());
    const totalBalance = useSelector(selectTotalBalance());
    if (!totalLocked || !totalBalance) return undefined;
    return totalLocked?.add(totalBalance);
  };
}
