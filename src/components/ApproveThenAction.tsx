import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "./Button";
import tick from "../assets/ui/tick.svg";
import { Token } from "../lib/types";
import { useBackd } from "../app/hooks/use-backd";
import { approve, selectAllowance } from "../state/userSlice";
import { ScaledNumber } from "../lib/scaled-number";
import { hasPendingTransaction } from "../state/transactionsSlice";
import { INFINITE_APPROVE_AMMOUNT } from "../lib/constants";

interface ButtonsProps {
  stepsOnTop?: boolean;
  showApprove?: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props: ButtonsProps) => (props.stepsOnTop ? "column-reverse" : "column")};
`;

const Buttons = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props: ButtonsProps) =>
    props.showApprove ? "repeat(2, 1fr)" : "repeat(1, 1fr)"};
  grid-gap: 1.5rem;
  margin-bottom: ${(props: ButtonsProps) =>
    props.stepsOnTop || !props.showApprove ? "0" : "1rem"};
  margin-top: ${(props: ButtonsProps) => (props.stepsOnTop ? "1.1rem" : "0")};

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-template-rows: ${(props: ButtonsProps) =>
      props.showApprove ? "repeat(2, 1fr)" : "repeat(1, 1fr)"};
    grid-gap: 1.8rem;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ProgressSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type StepProps = {
  complete: boolean;
  disabled: boolean;
};

const Number = styled.div`
  position: relative;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  background: ${(props: StepProps) =>
    props.disabled ? "#535068" : props.complete ? "#16C784" : "#C532F9"};
  color: var(--main);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.4rem;
`;

const Tick = styled.img`
  height: 1.1rem;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  top: 50%;
  left: 0;
  transform: translate(50%, calc(-50% - 1px));
  background: ${(props: StepProps) =>
    props.disabled
      ? "#535068"
      : props.complete
      ? "linear-gradient(to right, #16C784, #C532F9)"
      : "linear-gradient(to right, #C532F9, #535068)"};
`;

interface Props {
  label: string;
  action: () => void;
  value: ScaledNumber;
  loading: boolean;
  disabled: boolean;
  token: Token;
  contract: string;
  stepsOnTop?: boolean;
  hoverText?: string;
  oneButton?: boolean;
}

const ApproveThenAction = ({
  label,
  action,
  value,
  loading,
  disabled,
  token,
  contract,
  stepsOnTop,
  hoverText,
  oneButton,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const backd = useBackd();
  const approvedAmount = useSelector(selectAllowance(token.address, contract));
  const approveLoading = useSelector(hasPendingTransaction("Approve"));
  const [persistApprove, setPersistApprove] = useState(false);

  const approved =
    !!approvedAmount && (value.isZero() ? !approvedAmount.isZero() : approvedAmount.gte(value));
  hoverText = hoverText || t("amountInput.enter");

  const executeApprove = () => {
    if (!backd || approved || approveLoading) return;
    setPersistApprove(true);
    dispatch(
      approve({
        token,
        spender: contract,
        amount: ScaledNumber.fromUnscaled(INFINITE_APPROVE_AMMOUNT),
        backd,
      })
    );
  };

  return (
    <Container stepsOnTop={stepsOnTop}>
      <Buttons stepsOnTop={stepsOnTop} showApprove={(!approved || persistApprove) && !oneButton}>
        {(!approved || persistApprove) && !oneButton && (
          <Button
            id="approve-button"
            primary
            medium
            wide
            text={t("amountInput.approve", { asset: token.symbol })}
            click={executeApprove}
            complete={approved}
            loading={approveLoading}
            disabled={disabled}
            hoverText={hoverText}
          />
        )}
        <Button
          id="action-button"
          primary
          medium
          wide
          text={
            oneButton
              ? !approved
                ? `1/2 ${t("amountInput.approve", { asset: token.symbol })}`
                : `2/2 ${label}`
              : label
          }
          click={!approved && oneButton ? executeApprove : action}
          disabled={(!approved && !oneButton) || disabled}
          loading={(approveLoading && oneButton) || loading}
          hoverText={hoverText}
        />
      </Buttons>
      {(!approved || persistApprove) && !oneButton && (
        <ProgressContainer>
          <ProgressSection>
            <Line complete={approved} disabled={disabled} />
            <Number complete={approved} disabled={disabled}>
              {approved && !disabled ? <Tick src={tick} alt="tick" /> : "1"}
            </Number>
          </ProgressSection>
          <ProgressSection>
            <Number complete={false} disabled={!approved || disabled}>
              2
            </Number>
          </ProgressSection>
        </ProgressContainer>
      )}
    </Container>
  );
};

export default ApproveThenAction;
