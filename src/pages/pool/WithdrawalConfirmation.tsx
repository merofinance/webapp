import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ScaledNumber } from "scaled-number";

import { useDevice } from "../../app/hooks/use-device";
import Popup from "../../components/Popup";
import { Pool } from "../../lib";
import { selectWithdrawalFee } from "../../state/userSlice";
import InfoBlock from "../../components/InfoBlock";

interface Props {
  pool: Pool;
  show: boolean;
  close: () => void;
  value: ScaledNumber;
  submit: () => void;
  loading: boolean;
}

const WithdrawalConfirmation = ({
  pool,
  show,
  close,
  value,
  submit,
  loading,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const withdrawalFee = useSelector(selectWithdrawalFee(pool));
  const feePercent = withdrawalFee ? `${withdrawalFee.mul(100).toCryptoString()}%` : "---";
  const fee = withdrawalFee ? withdrawalFee.mul(value).toCryptoString() : "---";
  const withdrawnAmount = withdrawalFee ? value.sub(value.mul(withdrawalFee)) : new ScaledNumber();
  const maxWithdrawalFee = pool.maxWithdrawalFee.toPercent();
  const minWithdrawalFee = pool.minWithdrawalFee.toPercent();
  const days = pool.feeDecreasePeriod.toNumber() / 86400;
  const asset = pool.underlying.symbol;

  return (
    <Popup
      id="withdrawal-confirmation"
      header={t("pool.tabs.withdraw.confirmation.header")}
      body={t("pool.tabs.withdraw.confirmation.subHeader", {
        amount: value.toCryptoString(),
        asset,
      })}
      show={show}
      close={close}
      submit={submit}
      loading={loading}
      confirmationText={t("pool.tabs.withdraw.confirmation.button", {
        amount: value.toCryptoString(),
        asset,
      })}
    >
      <InfoBlock
        sections={[
          [
            {
              label: isMobile
                ? t("pool.tabs.withdraw.confirmation.details.amount.labelMobile")
                : t("pool.tabs.withdraw.confirmation.details.amount.label"),
              tooltip: t("pool.tabs.withdraw.confirmation.details.amount.tooltip", {
                asset,
              }),
              value: `${value.toCryptoString()} ${asset}`,
            },
            {
              label: t("pool.tabs.withdraw.confirmation.details.fee.label"),
              tooltip: t("pool.information.withdrawalFees.tooltip", {
                max: maxWithdrawalFee,
                min: minWithdrawalFee,
                days,
              }),
              value: `${feePercent}${isMobile ? "" : ` (${fee} ${asset})`}`,
            },
            {
              label: t("pool.tabs.withdraw.confirmation.details.receive.label"),
              tooltip: t("pool.tabs.withdraw.confirmation.details.receive.tooltip", {
                asset,
              }),
              value: `${withdrawnAmount.toCryptoString()} ${asset}`,
            },
          ],
        ]}
      />
    </Popup>
  );
};

export default WithdrawalConfirmation;
