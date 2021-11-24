import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { useDevice } from "../../app/hooks/use-device";
import AmountInput from "../../components/AmountInput";
import { selectPoolBalance } from "../../state/userSlice";
import { Pool } from "../../lib";
import { ScaledNumber } from "../../lib/scaled-number";
import DepositButtons from "./DepositButtons";
import { Optional } from "../../lib/types";

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
  const availableToDeposit = useSelector(selectPoolBalance(pool?.underlying.address));
  const { isMobile } = useDevice();
  const [depositAmount, setDepositAmount] = useState("");
  const value = ScaledNumber.fromUnscaled(depositAmount, pool?.underlying.decimals);

  const inputLabel = isMobile
    ? t("pool.tabs.deposit.input.labelMobile")
    : t("pool.tabs.deposit.input.labelDesktop", { asset: pool?.underlying.symbol || "---" });

  const error = () => {
    if (!availableToDeposit) return "";
    if (depositAmount && Number(depositAmount) <= 0) return t("amountInput.validation.positive");
    try {
      const amount = ScaledNumber.fromUnscaled(depositAmount, pool?.underlying.decimals);
      if (amount.gt(availableToDeposit)) return t("amountInput.validation.exceedsBalance");
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
        max={availableToDeposit}
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
