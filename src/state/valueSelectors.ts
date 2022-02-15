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
// TODO Change from using maxFee to using depositTokenBalance for pretty much everything
// TODO Do a check of all selectors used to make sure they make sense
// TODO Remove use of selectTokenBalance
// TODO Remove use of selectBalance
// TODO Check for remaining TODOs

/*
 * VALUE SELECTOR NAMING CONVENTION
 * There were a few bugs from the value selectors having slightly ambigious naming conventions.
 * So this is an attempt to standardise so it's explicitly clear what we should expect as a return value.
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
    const usersPoolLpLocked = useSelector(selectUsersPoolLpLocked(pool));
    if (!usersPoolLpLocked || !pool) return null;
    return usersPoolLpLocked.mul(pool.exchangeRate);
  };
}

export function selectUsersPoolUnderlyingUnlocked(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const usersPoolLpUnlocked = useSelector(selectUsersPoolLpUnlocked(pool));
    if (!usersPoolLpUnlocked || !pool) return null;
    return usersPoolLpUnlocked.mul(pool.exchangeRate);
  };
}

export function selectUsersPoolUnderlyingEverywhere(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    const usersPoolLpEverywhere = useSelector(selectUsersPoolLpEverywhere(pool));
    if (!usersPoolLpEverywhere || !pool) return null;
    return usersPoolLpEverywhere.mul(pool.exchangeRate);
  };
}

export const selectUsersTotalUsdHeld = (state: RootState): Optional<ScaledNumber> => {
  const pools = selectPools(state);
  const prices = selectPrices(state);
  const balances = selectBalances(state);
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

export const selectUsersTotalUsdStaked = (state: RootState): Optional<ScaledNumber> => {
  const pools = selectPools(state);
  const prices = selectPrices(state);
  const balances = selectBalances(state);
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

export const selectUsersTotalUsdLocked = (state: RootState): Optional<ScaledNumber> => {
  const pools = selectPools(state);
  const prices = selectPrices(state);
  const positions = selectPositions(state);
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

export const selectUsersTotalUsdEverywhere = (state: RootState): Optional<ScaledNumber> => {
  const usersTotalUsdHeld = selectUsersTotalUsdHeld(state);
  const usersTotalUsdStaked = selectUsersTotalUsdStaked(state);
  const usersTotalUsdLocked = selectUsersTotalUsdLocked(state);
  if (!usersTotalUsdHeld || !usersTotalUsdStaked || !usersTotalUsdLocked) return null;
  return usersTotalUsdHeld.add(usersTotalUsdStaked).add(usersTotalUsdLocked);
};

export function selectProtocolPoolUnderlyingEverywhere(
  pool: Optional<Pool>
): Selector<RootState, Optional<ScaledNumber>> {
  return (state: RootState) => {
    if (!pool) return null;
    return pool.totalAssets;
  };
}

export const selectProtocolTotalUsdEverywhere = (state: RootState): Optional<ScaledNumber> => {
  const pools = selectPools(state);
  const prices = selectPrices(state);
  if (!pools || !prices) return null;
  let total = new ScaledNumber();
  for (let i = 0; i < pools.length; i++) {
    const price = prices[pools[i].underlying.symbol];
    if (!price || !pools[i].totalAssets.mul) return null;
    total = total.add(pools[i].totalAssets.mul(price));
  }
  return total;
};

// Meow

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

export const selectBalance = (state: RootState): Optional<ScaledNumber> => {
  const pools = selectPools(state);
  const prices = selectPrices(state);
  const balances = selectBalances(state);
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
