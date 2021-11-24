import { useSelector } from "react-redux";
import { Selector } from "reselect";
import { RootState } from "../app/store";
import { ScaledNumber } from "../lib/scaled-number";
import { Optional, Pool, Position } from "../lib/types";
import { selectPools, selectPrices } from "./poolsListSlice";
import { selectPoolPositions, selectPositions } from "./positionsSlice";
import { selectPoolBalance, selectBalances } from "./userSlice";

export function selectPool(poolName: string | undefined): (state: RootState) => Optional<Pool> {
  return (state: RootState) => {
    if (!poolName) return null;
    return (
      state.pools.pools.find((p) => p.lpToken.symbol.toLowerCase() === poolName.toLowerCase()) ||
      null
    );
  };
}

export function getAddress(addressOrPool: string | Optional<Pool>): Optional<string> {
  if (typeof addressOrPool === "string") {
    return addressOrPool;
  }
  if (!addressOrPool) return null;
  return addressOrPool.lpToken.address;
}

export function selectPrice(pool: Optional<Pool>): Selector<RootState, Optional<number>> {
  return (state: RootState) => (pool ? state.pools.prices[pool.underlying.symbol] : null);
}

export function selectPoolLocked(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const positions = useSelector(selectPoolPositions(pool));
    if (!pool || !positions) return null;
    return positions.reduce(
      (a: ScaledNumber, b: Position) => a.add(b.maxTopUp),
      new ScaledNumber()
    );
  };
}

export function selectLocked(): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const prices = useSelector(selectPrices);
    const balances = useSelector(selectBalances);
    const positions = useSelector(selectPositions);

    if (!pools || !prices || !balances || !positions) return null;

    let total = new ScaledNumber();
    for (let i = 0; i < positions.length; i++) {
      const pool = pools.filter(
        (pool: Pool) => pool.underlying.address === positions[i].actionToken
      )[0];
      if (!pool) return null;
      const price = prices[pool.underlying.symbol];
      if (!price) return null;
      total = total.add(positions[i].maxTopUp.mul(price));
    }
    return total;
  };
}

export function selectBalance(): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const prices = useSelector(selectPrices);
    const balances = useSelector(selectBalances);
    const positions = useSelector(selectPositions);

    if (!pools || !prices || !balances || !positions) return null;

    let total = new ScaledNumber();
    for (let i = 0; i < pools.length; i++) {
      const balance = balances[pools[i].lpToken.address];
      const price = prices[pools[i].underlying.symbol];
      if (!price || !balance) return null;
      total = total.add(balance.mul(price));
    }
    return total;
  };
}

export function selectPoolDeposits(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const locked = useSelector(selectPoolLocked(pool));
    const balance = useSelector(selectPoolBalance(pool));
    if (!pool || !locked || !balance) return null;
    return locked.add(balance);
  };
}

export function selectPoolTotalDeposits(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    return ScaledNumber.fromUnscaled(pool.totalAssets, pool.underlying.decimals);
  };
}

export function selectDeposits(): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const locked = useSelector(selectLocked());
    const balance = useSelector(selectBalance());
    if (!locked || !balance) return null;
    return locked.add(balance);
  };
}

export function selectTotalDeposits(): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const prices = useSelector(selectPrices);
    const balances = useSelector(selectBalances);
    const positions = useSelector(selectPositions);

    if (!pools || !prices || !balances || !positions) return null;

    let total = new ScaledNumber();
    for (let i = 0; i < pools.length; i++) {
      const price = prices[pools[i].underlying.symbol];
      if (!price) return null;
      total = total.add(ScaledNumber.fromUnscaled(pools[i].totalAssets).mul(price));
    }
    return total;
  };
}
