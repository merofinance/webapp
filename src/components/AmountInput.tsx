import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ScaledNumber } from "../lib/scaled-number";
import AmountSlider from "./AmountSlider";
import Input from "./Input";

const StyledAmountInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Available = styled.div`
  width: 100%;
  text-align: right;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
`;

type Props = {
  value: string;
  setValue: (v: string) => void;
  label: string;
  max: ScaledNumber;
  noSlider?: boolean;
  error: string;
};

const AmountInput = ({ value, setValue, label, max, noSlider, error }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledAmountInput>
      <Available id="available-amount">
        {t("amountInput.available", { amount: max.toCryptoString() })}
      </Available>
      <Input
        id="amount-input"
        valid={!error}
        label={label}
        value={value}
        type="number"
        onChange={(v: string) => setValue(v)}
        background="#100830"
        buttonText={t("amountInput.max")}
        buttonAction={() => setValue(max.toString())}
        errorMessage={error}
      />
      {!noSlider && <AmountSlider value={value} max={max} setValue={setValue} />}
    </StyledAmountInput>
  );
};

export default AmountInput;
