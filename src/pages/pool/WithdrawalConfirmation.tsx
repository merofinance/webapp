import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDevice } from "../../app/hooks/use-device";
import Popup from "../../components/Popup";
import BackdTooltip from "../../components/Tooltip";
import { Pool } from "../../lib";
import { ScaledNumber } from "../../lib/scaled-number";
import { selectWithdrawalFee } from "../../state/userSlice";

const Summary = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(60, 60, 60, 0.5);
  border-radius: 1.4rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.6rem 0;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.15px;
  text-transform: capitalize;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

interface Props {
  pool: Pool;
  show: boolean;
  close: () => void;
  value: ScaledNumber;
  submit: () => void;
  loading: boolean;
}

const WithdrawalConfirmation = ({ pool, show, close, value, submit, loading }: Props) => {
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const withdrawalFee = useSelector(selectWithdrawalFee(pool));
  const feePercent = withdrawalFee ? `${withdrawalFee.mul(100).toCryptoString()}%` : "---";
  const fee = withdrawalFee ? withdrawalFee.mul(value).toCryptoString() : "---";
  const withdrawnAmount = withdrawalFee ? value.sub(value.mul(withdrawalFee)) : new ScaledNumber();
  const maxWithdrawalFee = `${(pool.maxWithdrawalFee * 100).toString()}%`;
  const minWithdrawalFee = `${(pool.minWithdrawalFee * 100).toString()}%`;
  const days = (pool.feeDecreasePeriod * 10 ** 18) / 86400;
  const asset = pool.underlying.symbol;

  return (
    <Popup
      confirm
      header={t("pool.tabs.withdraw.confirmation.header")}
      body={t("pool.tabs.withdraw.confirmation.subHeader", {
        amount: value.toCryptoString(),
        asset,
      })}
      content={
        <Summary>
          <Row>
            <Label>
              {isMobile
                ? t("pool.tabs.withdraw.confirmation.details.amount.labelMobile")
                : t("pool.tabs.withdraw.confirmation.details.amount.label")}
              <BackdTooltip
                content={t("pool.tabs.withdraw.confirmation.details.amount.tooltip", {
                  asset,
                })}
              />
            </Label>
            <Label>{`${value.toCryptoString()} ${asset}`}</Label>
          </Row>
          <Row>
            <Label>
              {t("pool.tabs.withdraw.confirmation.details.fee.label")}
              <BackdTooltip
                content={t("pool.information.withdrawalFees.tooltip", {
                  max: maxWithdrawalFee,
                  min: minWithdrawalFee,
                  days,
                })}
              />
            </Label>
            <Label>{`${feePercent}${isMobile ? "" : ` (${fee} ${asset})`}`}</Label>
          </Row>
          <Row>
            <Label>
              {t("pool.tabs.withdraw.confirmation.details.receive.label")}
              <BackdTooltip
                content={t("pool.tabs.withdraw.confirmation.details.receive.tooltip", {
                  asset,
                })}
              />
            </Label>
            <Label>{`${withdrawnAmount.toCryptoString()} ${asset}`}</Label>
          </Row>
        </Summary>
      }
      show={show}
      close={close}
      submit={submit}
      loading={loading}
      confirmationText={t("pool.tabs.withdraw.confirmation.button", {
        amount: value.toCryptoString(),
        asset,
      })}
    />
  );
};

export default WithdrawalConfirmation;
