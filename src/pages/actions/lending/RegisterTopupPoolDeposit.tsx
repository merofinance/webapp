import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import BackButton from "../../../components/BackButton";
import { selectBalance } from "../../../state/userSlice";
import { ScaledNumber } from "../../../lib/scaled-number";
import { selectPool, selectPrice } from "../../../state/selectors";
import AmountInput from "../../../components/AmountInput";
import { useDevice } from "../../../app/hooks/use-device";
import DepositButtons from "../../pool/DepositButtons";

interface TopupParams {
  address: string;
  protocol: string;
}

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.25px;
`;

const SubHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  opacity: 0.8;
  margin-top: 1.6rem;
`;

interface DepositSectionProps {
  error: boolean;
}

const DepositSection = styled.div`
  width: 100%;
  display: grid;
  align-items: flex-end;
  grid-gap: 1.8rem;
  margin-top: 6rem;

  > div:last-child {
    display: flex;
    margin-bottom: ${(props: DepositSectionProps) => (props.error ? "2.4rem" : "0.3rem")};
  }

  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;
interface Props {
  poolName: string;
}

const RegisterTopupPoolDeposit = ({ poolName }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { isMobile } = useDevice();
  const { address, protocol } = useParams<TopupParams>();
  const pool = useSelector(selectPool(poolName));
  const underlyingBalance = useSelector(selectBalance(pool?.underlying.address || ""));
  const depositedBalance = useSelector(selectBalance(pool));
  const price = useSelector(selectPrice(pool));
  const [depositAmount, setDepositAmount] = useState("");

  if (!pool) {
    history.push("/");
    throw Error("Pool not found");
  }

  const value = ScaledNumber.fromUnscaled(depositAmount, pool.underlying.decimals);

  const inputLabel = isMobile
    ? t("pool.tabs.deposit.input.labelMobile")
    : t("pool.tabs.deposit.input.labelDesktop", { asset: pool.underlying.symbol });

  const error = () => {
    if (depositAmount && Number(depositAmount) <= 0) return t("amountInput.validation.positive");
    try {
      const amount = ScaledNumber.fromUnscaled(depositAmount, pool.underlying.decimals);
      if (amount.gt(underlyingBalance)) return t("amountInput.validation.exceedsBalance");
      return "";
    } catch {
      return t("amountInput.validation.invalid");
    }
  };

  return (
    <Container>
      <BackButton />
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="3/4"
        content={
          <Content>
            <Header id="register-topup-pool-deposit">
              {t("actions.topup.stages.pool.deposit.header", { asset: pool.underlying.symbol })}
            </Header>
            <SubHeader>
              {t("actions.topup.stages.pool.deposit.subHeader", { asset: pool.underlying.symbol })}
            </SubHeader>
            <DepositSection error={!!error()}>
              <AmountInput
                noSlider
                value={depositAmount}
                setValue={(v: string) => setDepositAmount(v)}
                label={inputLabel}
                max={underlyingBalance}
                error={error()}
              />
              <DepositButtons
                stepsOnTop
                pool={pool}
                value={value}
                complete={() => setDepositAmount("")}
                valid={!error() && !value.isZero()}
              />
            </DepositSection>
            <ButtonContainer>
              <Button
                id="register-topup-pool-deposit-button"
                primary
                medium
                width="44%"
                text={t("components.continue")}
                click={() =>
                  history.push(
                    `/actions/register/topup/${address}/${protocol}/${pool.lpToken.symbol}`
                  )
                }
                disabled={!pool || Number(depositedBalance.toString()) * price < 50}
                hoverText={t("actions.topup.stages.pool.deposit.incomplete", {
                  asset: pool?.underlying.symbol,
                })}
              />
            </ButtonContainer>
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupPoolDeposit;
