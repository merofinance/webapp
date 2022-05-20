import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ScaledNumber } from "scaled-number";

import { useDevice } from "../../app/hooks/use-device";
import AmountInput from "../../components/AmountInput";
import { Pool } from "../../lib";
import DepositButtons from "./DepositButtons";
import { Optional } from "../../lib/types";
import { selectUsersPoolUnderlyingEverywhere } from "../../state/valueSelectors";
import { selectPoolUnderlyingBalance } from "../../state/userSlice";

interface PoolDepositProps {
  error: boolean;
  compact?: boolean;
}

const StyledPoolDeposit = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-end;
  grid-gap: ${(props: PoolDepositProps) => (props.compact ? "1.8rem" : "0")};

  > div:last-child {
    display: flex;
    margin-bottom: ${(props: PoolDepositProps) =>
      props.compact ? (props.error ? "2.4rem" : "0.3rem") : "0"};
  }

  grid-template-columns: ${(props: PoolDepositProps) =>
    props.compact ? "repeat(2, 1fr)" : "repeat(1, 1fr)"};
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

interface Props {
  pool: Optional<Pool>;
  compact?: boolean;
}

const PoolDeposit = ({ pool, compact }: Props): JSX.Element => {
  const { t } = useTranslation();
  const poolUnderlyingBalance = useSelector(selectPoolUnderlyingBalance(pool));
  const usersPoolUnderlyingEverywhere = useSelector(selectUsersPoolUnderlyingEverywhere(pool));
  const { isMobile } = useDevice();
  const [depositAmount, setDepositAmount] = useState("");
  const value = ScaledNumber.fromUnscaled(depositAmount, pool?.underlying.decimals);

  const inputLabel = isMobile
    ? t("pool.tabs.deposit.input.labelMobile")
    : t("pool.tabs.deposit.input.labelDesktop", { asset: pool?.underlying.symbol || "---" });

  const error = () => {
    if (!pool || !poolUnderlyingBalance || !depositAmount) return "";
    if (pool.isPaused) return t("amountInput.validation.poolPaused");
    if (Number(depositAmount) <= 0) return t("amountInput.validation.positive");
    try {
      const amount = ScaledNumber.fromUnscaled(depositAmount, pool?.underlying.decimals);
      if (amount.gt(poolUnderlyingBalance)) return t("amountInput.validation.exceedsBalance");
      if (!usersPoolUnderlyingEverywhere) return "";
      if (
        !amount.isZero() &&
        !pool.depositCap.isZero() &&
        amount.gt(pool.depositCap.sub(usersPoolUnderlyingEverywhere))
      )
        return t("amountInput.validation.exceedsCap");
      return "";
    } catch {
      return t("amountInput.validation.invalid");
    }
  };

  return (
    <StyledPoolDeposit compact={compact} error={!!error()}>
      <AmountInput
        noSlider={compact}
        value={depositAmount}
        setValue={(v: string) => setDepositAmount(v)}
        label={inputLabel}
        balance={poolUnderlyingBalance}
        max={
          poolUnderlyingBalance && pool && usersPoolUnderlyingEverywhere
            ? poolUnderlyingBalance.min(pool.depositCap.sub(usersPoolUnderlyingEverywhere))
            : undefined
        }
        error={error()}
        symbol={pool?.underlying.symbol || "---"}
      />
      <DepositButtons
        stepsOnTop={compact}
        pool={pool}
        value={value}
        complete={() => setDepositAmount("")}
        valid={!error() && !value.isZero()}
      />
    </StyledPoolDeposit>
  );
};

export default PoolDeposit;
