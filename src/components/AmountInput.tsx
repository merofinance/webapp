import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ScaledNumber } from "scaled-number";

import { Optional } from "../lib/types";
import AmountSlider from "./AmountSlider";
import Input from "./Input";
import Loader from "./Loader";

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
  display: flex;
  justify-content: flex-end;

  @media only percy {
    opacity: 0;
  }
`;

interface Props {
  value: string;
  setValue: (v: string) => void;
  label: string;
  noSlider?: boolean;
  error: string;
  symbol: string;
  balance: Optional<ScaledNumber>;
  max?: Optional<ScaledNumber>;
}

const AmountInput = ({
  value,
  setValue,
  label,
  error,
  symbol,
  noSlider,
  balance,
  max,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  max = max === undefined ? balance : max;

  return (
    <StyledAmountInput>
      <Available id="available-amount">
        {balance ? (
          `${t("amountInput.available", {
            amount: balance.toCryptoString(),
          })} ${symbol.toUpperCase()}`
        ) : (
          <Loader />
        )}
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
        buttonAction={() => {
          if (max) setValue(max.toString());
        }}
        errorMessage={error}
      />
      {!noSlider && (
        <AmountSlider value={value} max={max || new ScaledNumber()} setValue={setValue} />
      )}
    </StyledAmountInput>
  );
};

export default AmountInput;
