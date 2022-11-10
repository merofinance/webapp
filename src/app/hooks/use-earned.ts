import { LiquidityPool__factory, LpToken__factory } from "@merofinance/protocol";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScaledNumber } from "scaled-number";
import { Optional, Pool } from "../../lib/types";
import { selectUsersPoolUnderlyingEverywhere } from "../../state/valueSelectors";

const useEarned = (pool: Optional<Pool>): Optional<ScaledNumber> => {
  const { account, library } = useWeb3React();
  const withdrawable = useSelector(selectUsersPoolUnderlyingEverywhere(pool));

  const [earned, setEarned] = useState<Optional<ScaledNumber>>(null);

  const updateEarend = async () => {
    if (!account || !library || !pool || !withdrawable) return;

    const { provider } = library;
    const poolContract = LiquidityPool__factory.connect(pool.address, provider);
    const lpContract = LpToken__factory.connect(pool.lpToken.address, provider);

    const [deposits, depositFors, withdrawals, transferOuts, transferIns] = await Promise.all([
      poolContract.queryFilter(poolContract.filters.Deposit(account)),
      poolContract.queryFilter(poolContract.filters.DepositFor(null, account)),
      poolContract.queryFilter(poolContract.filters.Redeem(account)),
      lpContract.queryFilter(lpContract.filters.Transfer(account, null)),
      lpContract.queryFilter(lpContract.filters.Transfer(null, account)),
    ]);

    // Getting total transfered in
    const totalTransferedIn = transferIns.reduce((acc, event) => {
      return acc.add(new ScaledNumber(event.args.value, pool.lpToken.decimals));
    }, ScaledNumber.fromUnscaled(0, pool.lpToken.decimals));
    console.log("totalTransferedIn", totalTransferedIn.toCryptoString());

    // Getting total transfered out
    const totalTransferedOut = transferOuts.reduce((acc, event) => {
      return acc.add(new ScaledNumber(event.args.value, pool.lpToken.decimals));
    }, ScaledNumber.fromUnscaled(0, pool.lpToken.decimals));
    console.log("totalTransferedOut", totalTransferedOut.toCryptoString());

    // Getting total deposited
    const totalDeposited = deposits.reduce((acc, event) => {
      return acc.add(new ScaledNumber(event.args.depositAmount, pool.lpToken.decimals));
    }, ScaledNumber.fromUnscaled(0, pool.lpToken.decimals));
    console.log("totalDeposited", totalDeposited.toCryptoString());

    // Getting total deposited for
    const totalDepositedFor = depositFors.reduce((acc, event) => {
      return acc.add(new ScaledNumber(event.args.depositAmount, pool.lpToken.decimals));
    }, ScaledNumber.fromUnscaled(0, pool.lpToken.decimals));

    console.log("Total deposited for", totalDepositedFor.toCryptoString());

    // Getting total withdrawn
    const totalWithdrawn = withdrawals.reduce((acc, event) => {
      return acc.add(new ScaledNumber(event.args.redeemAmount, pool.lpToken.decimals));
    }, ScaledNumber.fromUnscaled(0, pool.lpToken.decimals));
    console.log("totalWithdrawn", totalWithdrawn.toCryptoString());

    setEarned(
      totalWithdrawn
        .add(withdrawable)
        .sub(totalDeposited)
        .sub(totalDepositedFor)
        .sub(totalTransferedIn)
        .add(totalTransferedOut)
    );
  };

  const hasWithdrawable = !!withdrawable;

  useEffect(() => {
    updateEarend();
  }, [account, library, pool?.address, hasWithdrawable]);

  return earned;
};

export default useEarned;
