import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ScaledNumber } from "scaled-number";

import Button from "../../components/Button";
import { Pool } from "../../lib";
import { selectWithdrawalFee, withdraw } from "../../state/userSlice";
import { selectUsersPoolUnderlyingUnlocked } from "../../state/valueSelectors";
import { useMero } from "../../app/hooks/use-mero";
import { AppDispatch } from "../../app/store";
import { hasPendingTransaction } from "../../state/transactionsSlice";
import Loader from "../../components/Loader";
import { Optional } from "../../lib/types";
import WithdrawalConfirmation from "./WithdrawalConfirmation";

const StyledProgressButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  value: ScaledNumber;
  pool: Optional<Pool>;
  complete: () => void;
  valid: boolean;
}

const WithdrawalButton = ({ value, pool, complete, valid }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const mero = useMero();
  const loading = useSelector(hasPendingTransaction("Withdraw"));
  const withdrawalFee = useSelector(selectWithdrawalFee(pool));
  const usersPoolUnderlyingUnlocked = useSelector(selectUsersPoolUnderlyingUnlocked(pool));

  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!loading) {
      setConfirming(false);
      complete();
    }
    return () => {
      setConfirming(false);
    };
  }, [loading]);

  const submit = () => {
    if (!valid || !usersPoolUnderlyingUnlocked || !pool || !mero || !withdrawalFee) return;
    const lpValue = value.div(pool.exchangeRate);

    // If the amount the user is withdrawing is 99.9% of their total, then withdraw their total
    // This is to avoid the situation where a user withdraws all their tokens other than 0.00000001 DAI from a rounding error
    const isMaxWithdrawal = usersPoolUnderlyingUnlocked
      .sub(lpValue)
      .div(usersPoolUnderlyingUnlocked)
      .lte(ScaledNumber.fromUnscaled(0.001, lpValue.decimals));

    const amount = isMaxWithdrawal ? usersPoolUnderlyingUnlocked : lpValue;
    dispatch(withdraw({ mero, pool, amount, withdrawalFee }));
  };

  if (!pool) return <Loader button />;

  return (
    <StyledProgressButtons>
      <Button
        id="withdraw-button"
        primary
        medium
        wide
        click={() => setConfirming(true)}
        disabled={!valid}
        hoverText={t("amountInput.enter")}
        loading={loading}
      >
        {t("pool.tabs.withdraw.action", { asset: pool.underlying.symbol.toUpperCase() })}
      </Button>
      <WithdrawalConfirmation
        pool={pool}
        show={confirming}
        close={() => setConfirming(false)}
        submit={submit}
        value={value}
        loading={loading}
      />
    </StyledProgressButtons>
  );
};

export default WithdrawalButton;
