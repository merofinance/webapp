import { BigNumber } from "ethers";
import { useSelector } from "react-redux";
import { Selector } from "reselect";
import { RootState } from "../app/store";
import { DEFAULT_DECIMALS } from "../lib/constants";
import { ScaledNumber } from "../lib/scaled-number";
import { Optional, Pool, Position } from "../lib/types";
import { selectPools, selectPrices } from "./poolsListSlice";
import { selectPoolPositions, selectPositions } from "./positionsSlice";
import { selectBalances } from "./userSlice";
// TODO Change to use the simpler syntax like average apy
// TODO Rename to value selectors and split out others
// TODO Add gas bank to totals
// TODO Change from using maxFee to using depositTokenBalance for pretty much everything
// TODO Do a check of all selectors used to make sure they make sense
// TODO Remove use of selectTokenBalance
// TODO Remove use of selectBalance

/*
 * SELECTOR NAMING CONVENTION
 * There were a few bugs from selectors having slightly ambigious naming conventions.
 * So this is an attempt to standardise all our value selectors so it's always explicitly clear what we should expect as a return value.
 *
 * The selectors have a naming convention of: `select[Owner][Domain][What][Where]`
 *
 * Owner:
 * The owner of the value.
 * Options are:
 * - Users: The value owned by the user
 * - Protocol: The value owned by all users
 *
 * Domain:
 * The domain of the value.
 * Options are:
 * - Pool: The value is within the given pool
 * - Total: The value is across all pools
 *
 * What:
 * The unit of the value.
 * Options are:
 * - Lp: The value is the amount of LP Tokens of the given pool
 * - Underlying: The value is the amount of the underlying token of the given pool
 * - Usd: The value is the USD value of the assets
 *
 * Where:
 * Where the value is in relation to.
 * - Held: The value is the amount held in a wallet
 * - Staked: The value is the amount staked in the staker vault
 * - Locked: The value is the amount locked in actions
 * - Unlocked: The value is the amount that are not locked in actions (i.e. Held + Staked)
 * - Anywhere: The value is the amount that is anywhere (i.e. Held + Staked + Locked)A
 */

export function selectUsersPoolLpHeld(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const usersPoolLpHeld = state.user.balances[pool.lpToken.address];
    if (!usersPoolLpHeld) return null;
    return ScaledNumber.fromPlain(usersPoolLpHeld);
  };
}

export function selectUsersPoolLpStaked(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const usersPoolLpStaked = state.user.balances[pool.stakerVaultAddress];
    if (!usersPoolLpStaked) return null;
    return ScaledNumber.fromPlain(usersPoolLpStaked);
  };
}

export function selectUsersPoolLpLocked(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const positions = useSelector(selectPoolPositions(pool));
    if (!positions) return null;
    let total = new ScaledNumber();
    for (let i = 0; i < positions.length; i++) {
      total = total.add(positions[i].maxTopUp);
    }
    return total;
  };
}

export function selectUsersPoolLpUnlocked(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const usersPoolLpHeld = useSelector(selectUsersPoolLpHeld(pool));
    const usersPoolLpStaked = useSelector(selectUsersPoolLpStaked(pool));
    if (!usersPoolLpHeld || !usersPoolLpStaked) return null;
    return usersPoolLpHeld.add(usersPoolLpStaked);
  };
}

export function selectUsersPoolLpEverywhere(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const usersPoolLpHeld = useSelector(selectUsersPoolLpHeld(pool));
    const usersPoolLpStaked = useSelector(selectUsersPoolLpStaked(pool));
    const usersPoolLpLocked = useSelector(selectUsersPoolLpLocked(pool));
    if (!usersPoolLpHeld || !usersPoolLpStaked || !usersPoolLpLocked) return null;
    return usersPoolLpHeld.add(usersPoolLpStaked).add(usersPoolLpLocked);
  };
}

export function selectUsersPoolUnderlyingLocked(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const usersPoolLpLocked = useSelector(selectUsersPoolLpLocked(pool));
    if (!usersPoolLpLocked) return null;
    return usersPoolLpLocked.mul(pool.exchangeRate);
  };
}

export function selectUsersPoolUnderlyingUnlocked(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const usersPoolLpUnlocked = useSelector(selectUsersPoolLpUnlocked(pool));
    if (!usersPoolLpUnlocked) return null;
    return usersPoolLpUnlocked.mul(pool.exchangeRate);
  };
}

export function selectUsersPoolUnderlyingEverywhere(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    const usersPoolLpEverywhere = useSelector(selectUsersPoolLpEverywhere(pool));
    if (!usersPoolLpEverywhere) return null;
    return usersPoolLpEverywhere.mul(pool.exchangeRate);
  };
}

export function selectUsersTotalUsdHeld(): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const prices = useSelector(selectPrices);
    const balances = useSelector(selectBalances);
    if (!pools || !prices || !balances) return null;
    let total = new ScaledNumber();
    for (let i = 0; i < pools.length; i++) {
      const usersPoolLpHeld = balances[pools[i].lpToken.address];
      const underlyingPrice = prices[pools[i].underlying.symbol];
      if (!underlyingPrice || !usersPoolLpHeld) return null;
      total = total.add(usersPoolLpHeld.mul(pools[i].exchangeRate).mul(underlyingPrice));
    }
    return total;
  };
}

export function selectUsersTotalUsdStaked(): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const pools = useSelector(selectPools);
    const prices = useSelector(selectPrices);
    const balances = useSelector(selectBalances);
    if (!pools || !prices || !balances) return null;
    let total = new ScaledNumber();
    for (let i = 0; i < pools.length; i++) {
      const usersPoolLpStaked = balances[pools[i].stakerVaultAddress];
      const underlyingPrice = prices[pools[i].underlying.symbol];
      if (!underlyingPrice || !usersPoolLpStaked) return null;
      total = total.add(usersPoolLpStaked.mul(pools[i].exchangeRate).mul(underlyingPrice));
    }
    return total;
  };
}

export function selectUsersTotalUsdLocked(): Selector<RootState, Optional<ScaledNumber>> {
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
      total = total.add(positions[i].maxTopUp.mul(price));
    }
    return total;
  };
}

export function selectUsersTotalUsdEverywhere(): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const usersTotalUsdHeld = useSelector(selectUsersTotalUsdHeld());
    const usersTotalUsdStaked = useSelector(selectUsersTotalUsdStaked());
    const usersTotalUsdLocked = useSelector(selectUsersTotalUsdLocked());
    if (!usersTotalUsdHeld || !usersTotalUsdStaked || !usersTotalUsdLocked) return null;
    return usersTotalUsdHeld.add(usersTotalUsdStaked).add(usersTotalUsdLocked);
  };
}

export function selectProtocolPoolUnderlyingEverywhere(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    return pool.totalAssets;
  };
}

export function selectProtocolTotalUsdEverywhere(): Selector<RootState, Optional<ScaledNumber>> {
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

// Meow

export const selectAverageApy = (state: RootState): Optional<ScaledNumber> => {
  const pools = selectPools(state);
  if (!pools) return null;
  let poolCount = 0;
  let total = new ScaledNumber();
  for (let i = 0; i < pools.length; i++) {
    const { apy } = pools[i];
    if (!apy) return null;
    total = total.add(apy);
    poolCount++;
  }
  return total.div(poolCount);
};

export function selectTokenBalance(
  address: string | undefined
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!address) return null;
    const plainBalance = state.user.balances[address];
    if (!plainBalance) return null;
    return ScaledNumber.fromPlain(plainBalance);
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
      total = total.add(balance.mul(price));
    }
    return total;
  };
}
