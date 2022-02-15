import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "../../components/Button";
import { Pool } from "../../lib";
import { unstake, withdraw } from "../../state/userSlice";
import { selectUsersPoolLpHeld, selectUsersPoolLpStaked } from "../../state/valueSelectors";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import { ScaledNumber } from "../../lib/scaled-number";
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
  const backd = useBackd();
  const usersPoolLpStaked = useSelector(selectUsersPoolLpStaked(pool));
  const loading = useSelector(hasPendingTransaction("Withdraw"));
  const usersPoolLpHeld = useSelector(selectUsersPoolLpHeld(pool));

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

  const executeWithdraw = (amount: ScaledNumber) => {
    if (!backd || loading || !pool) return;
    dispatch(withdraw({ backd, pool, amount }));
  };

  const executeUnstake = () => {
    if (!backd || loading || !usersPoolLpStaked || !pool) return;
    dispatch(unstake({ backd, pool, amount: usersPoolLpStaked }));
  };

  const submit = () => {
    if (!valid || !usersPoolLpHeld) return;
    if (value.lte(usersPoolLpHeld)) executeWithdraw(value);
    else executeUnstake();
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
