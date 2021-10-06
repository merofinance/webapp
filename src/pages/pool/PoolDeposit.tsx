import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { useDevice } from "../../app/hooks/use-device";
import AmountInput from "../../components/AmountInput";
import { selectBalance } from "../../state/userSlice";
import { Pool } from "../../lib";
import { ScaledNumber } from "../../lib/scaled-number";
import DepositButtons from "./DepositButtons";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  pool: Pool;
}

const PoolDeposit = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const availableToDeposit = useSelector(selectBalance(pool.underlying.address));
  const { isMobile } = useDevice();
  const [depositAmount, setDepositAmount] = useState("");
  const value = ScaledNumber.fromUnscaled(depositAmount, pool.underlying.decimals);

  const inputLabel = isMobile
    ? t("pool.tabs.deposit.input.labelMobile")
    : t("pool.tabs.deposit.input.labelDesktop", { asset: pool.underlying.symbol });

  const error = () => {
    if (depositAmount && Number(depositAmount) <= 0) return t("amountInput.validation.positive");
    try {
      const amount = ScaledNumber.fromUnscaled(depositAmount, pool.underlying.decimals);
      if (amount.gt(availableToDeposit)) return t("amountInput.validation.exceedsBalance");
      return "";
    } catch {
      return t("amountInput.validation.invalid");
    }
  };

  return (
    <Content>
      <AmountInput
        value={depositAmount}
        setValue={(v: string) => setDepositAmount(v)}
        label={inputLabel}
        max={availableToDeposit}
        error={error()}
      />
      <DepositButtons
        pool={pool}
        value={value}
        complete={() => setDepositAmount("")}
        valid={!error() && !value.isZero()}
      />
    </Content>
  );
};

export default PoolDeposit;
