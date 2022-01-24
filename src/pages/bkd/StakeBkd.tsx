import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AmountInput from "../../components/AmountInput";
import ApproveThenAction from "../../components/ApproveThenAction";
import Button from "../../components/Button";
import ContentSection from "../../components/ContentSection";
import Tabs from "../../components/Tabs";
import { ScaledNumber } from "../../lib/scaled-number";
import { Optional } from "../../lib/types";
import { selectPools } from "../../state/poolsListSlice";
import BkdCalculator from "./BkdCalculator";
import UnstakeQueue from "./UnstakeQueue";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 1580px) {
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div`
  width: 20rem;
  margin-left: 1.3rem;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: flex-end;

  @media (max-width: 1580px) {
    margin-bottom: 0;
    width: 100%;
    margin-left: 0;
    margin-top: 2rem;
  }
`;

const StakeBkd = (): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const pools = useSelector(selectPools);

  if (!pools) return null; // TODO Remove

  const STAKING_CONTRACT = pools[0];
  const BKD = pools[0].underlying;
  const BKD_BALANCE = ScaledNumber.fromUnscaled(245.123456);
  const LOADING = false;

  const error = () => {
    if (amount && Number(amount) <= 0) return t("amountInput.validation.positive");
    try {
      const amount_ = ScaledNumber.fromUnscaled(amount);
      if (amount_.gt(BKD_BALANCE)) return t("amountInput.validation.exceedsBalance");
      return "";
    } catch {
      return t("amountInput.validation.invalid");
    }
  };

  return (
    <ContentSection
      noContentPadding
      header={t("bkd.stake.header")}
      content={
        <Tabs
          tabs={[
            {
              label: "bkd.stake.tab",
              content: (
                <Content>
                  <InputContainer>
                    <AmountInput
                      noSlider
                      value={amount}
                      setValue={(v: string) => setAmount(v)}
                      label={t("bkd.stake.input")}
                      max={BKD_BALANCE}
                      error={error()}
                      symbol="bkd"
                    />
                    <ButtonContainer>
                      <ApproveThenAction
                        oneButton
                        label={t("bkd.stake.header")}
                        action={() => console.log("todo")}
                        value={ScaledNumber.fromUnscaled(amount)}
                        loading={LOADING}
                        disabled={!!error()}
                        token={BKD}
                        contract={STAKING_CONTRACT.address}
                      />
                    </ButtonContainer>
                  </InputContainer>
                  {amount && !error() && (
                    <BkdCalculator amount={ScaledNumber.fromUnscaled(amount)} />
                  )}
                </Content>
              ),
            },
            {
              label: "bkd.unstake.tab",
              content: (
                <Content>
                  <InputContainer>
                    <AmountInput
                      noSlider
                      value={amount}
                      setValue={(v: string) => setAmount(v)}
                      label={t("bkd.unstake.input")}
                      max={BKD_BALANCE}
                      error={error()}
                      symbol="bkd"
                    />
                    <ButtonContainer>
                      <Button
                        primary
                        medium
                        wide
                        text={t("bkd.unstake.button")}
                        click={() => console.log("todo")}
                      />
                    </ButtonContainer>
                  </InputContainer>
                  {amount && !error() && (
                    <BkdCalculator withdraw amount={ScaledNumber.fromUnscaled(amount)} />
                  )}
                  <UnstakeQueue />
                </Content>
              ),
            },
          ]}
        />
      }
    />
  );
};

export default StakeBkd;
