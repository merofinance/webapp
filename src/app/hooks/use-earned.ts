import { LiquidityPool__factory } from "@merofinance/protocol";
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
    const contract = LiquidityPool__factory.connect(pool.address, provider);

    const depositFilter = contract.filters.Deposit(account);
    const withdrawFilter = contract.filters.Redeem(account);
    const [deposits, withdrawals] = await Promise.all([
      contract.queryFilter(depositFilter),
      contract.queryFilter(withdrawFilter),
    ]);

    // Getting total deposited
    let deposited = new ScaledNumber();
    deposits.forEach((deposit) => {
      deposited = deposited.add(
        new ScaledNumber(deposit.args.depositAmount, pool.underlying.decimals)
      );
    });

    // Getting total withdrawn
    let withdrawn = new ScaledNumber();
    withdrawals.forEach((withdrawal) => {
      withdrawn = withdrawn.add(
        new ScaledNumber(withdrawal.args.redeemAmount, pool.underlying.decimals)
      );
    });

    setEarned(withdrawn.add(withdrawable).sub(deposited));
  };

  const hasWithdrawable = !!withdrawable;

  useEffect(() => {
    updateEarend();
  }, [account, library, pool?.address, hasWithdrawable]);

  return earned;
};

export default useEarned;
