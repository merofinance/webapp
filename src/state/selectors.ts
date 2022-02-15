import { BigNumber } from "ethers";
import { useSelector } from "react-redux";
import { Selector } from "reselect";
import { RootState } from "../app/store";
import { DEFAULT_DECIMALS } from "../lib/constants";
import { ScaledNumber } from "../lib/scaled-number";
import { Optional, Pool, Position } from "../lib/types";
import { selectPools, selectPrices } from "./poolsListSlice";
import { selectPoolPositions, selectPositions } from "./positionsSlice";
import { selectBalances, selectPoolUnderlyingBalance } from "./userSlice";

export function selectPool(poolName: string | undefined): (state: RootState) => Optional<Pool> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    if (!poolName || !pools) return null;
    return pools.find((p) => p.lpToken.symbol.toLowerCase() === poolName.toLowerCase()) || null;
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

export function selectPoolLpLocked(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const positions = useSelector(selectPoolPositions(pool));
    if (!pool || !positions) return null;
    return positions.reduce(
      (a: ScaledNumber, b: Position) => a.add(b.maxTopUp),
      ScaledNumber.fromUnscaled(0, pool.lpToken.decimals)
    );
  };
}

export function selectPoolUnderlyingLocked(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const lpLocked = useSelector(selectPoolLpLocked(pool));
    if (!lpLocked) return null;
    return lpLocked.mul(pool.exchangeRate);
  };
}

export function selectLocked(): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const prices = useSelector(selectPrices);
    const positions = useSelector(selectPositions);

    if (!pools || !prices || !positions) return null;

    let total = new ScaledNumber();
    for (let i = 0; i < positions.length; i++) {
      const pool = pools.find((pool: Pool) => pool.underlying.address === positions[i].actionToken);
      if (!pool) return null;
      const price = prices[pool.underlying.symbol];
      if (!price) return null;
      const maxTopUp = new ScaledNumber(
        positions[i].maxTopUp.value.mul(
          BigNumber.from(10).pow(DEFAULT_DECIMALS - pool.underlying.decimals)
        )
      );
      total = total.add(maxTopUp.mul(price));
    }
    return total;
  };
}

export function selectBalance(): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const prices = useSelector(selectPrices);
    const balances = useSelector(selectBalances);

    if (!pools || !prices || !balances) return null;

    let total = new ScaledNumber();
    for (let i = 0; i < pools.length; i++) {
      const balance = balances[pools[i].lpToken.address];
      const price = prices[pools[i].underlying.symbol];
      if (!price || !balance) return null;
      const scaledBalance = new ScaledNumber(
        balance.value.mul(BigNumber.from(10).pow(DEFAULT_DECIMALS - pools[i].underlying.decimals))
      );
      total = total.add(scaledBalance.mul(price));
    }
    return total;
  };
}

export function selectPoolDeposits(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const locked = useSelector(selectPoolUnderlyingLocked(pool));
    const balance = useSelector(selectPoolUnderlyingBalance(pool));
    if (!pool || !locked || !balance) return null;
    return locked.add(balance);
  };
}

export function selectPoolTotalDeposits(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    return pool.totalAssets;
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

    if (!pools || !prices) return null;

    let total = new ScaledNumber();
    for (let i = 0; i < pools.length; i++) {
      const price = prices[pools[i].underlying.symbol];
      if (!price || !pools[i].totalAssets.mul) return null;
      total = total.add(pools[i].totalAssets.mul(price));
    }
    return total;
  };
}
