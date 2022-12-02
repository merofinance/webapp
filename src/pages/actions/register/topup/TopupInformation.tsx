import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { ScaledNumber } from "scaled-number";

import MeroTooltip from "../../../../components/MeroTooltip";
import { shortenAddress } from "../../../../lib/text";
import { Optional, Pool, Position } from "../../../../lib/types";
import { useDevice } from "../../../../app/hooks/use-device";
import { getEtherscanAddressLink } from "../../../../lib/web3";
import { selectActionFees } from "../../../../state/positionsSlice";
import { selectPrice } from "../../../../state/poolsListSlice";
import Loader from "../../../../components/Loader";
import InfoBlock from "../../../../components/InfoBlock";
import ExternalLink from "../../../../components/ExternalLink";

const StyledTopupInformation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Summary = styled.div`
  width: 100%;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;

  font-size: 1.6rem;
  margin-bottom: 3.5rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 1.8rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.15px;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const InfoSection = styled.div`
  position: relative;
  width: 100%;
  border: solid 2px var(--info);
  border-radius: 8px;
  padding: 1rem 1.6rem;
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;

  :before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: var(--info);
    opacity: 0.2;
  }
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InfoLabel = styled(Label)`
  color: var(--info);
`;

interface Props {
  position: Position;
  pool: Pool;
  value?: Optional<BigNumber>;
}

const TopupInformation = ({ position, pool, value }: Props): JSX.Element => {
  const { t } = useTranslation();
  const price = useSelector(selectPrice(pool));
  const actionFees = useSelector(selectActionFees);
  const { chainId } = useWeb3React();
  const { isMobile } = useDevice();

  const actionType = position.debtRepayment ? "debtRepayment" : "topup";

  return (
    <StyledTopupInformation>
      <Summary>
        {t(`actions.${actionType}.stages.confirmation.summaryStart`)}
        <ExternalLink large link={getEtherscanAddressLink(chainId, position.account)}>
          {shortenAddress(position.account, isMobile ? 10 : 26)}
        </ExternalLink>
        {t(`actions.${actionType}.stages.confirmation.summaryEnd`, {
          threshold: position.threshold,
          single: position.singleTopUp,
          asset: pool.underlying.symbol,
          singleUsd: price ? position.singleTopUp.toUsdValue(price) : "$---",
          max: position.maxTopUp,
          maxUsd: price ? position.maxTopUp.toUsdValue(price) : "$---",
        })}
      </Summary>
      <InfoBlock
        sections={[
          [
            {
              label: t(`actions.${actionType}.fields.protocol.label`),
              tooltip: t(`actions.${actionType}.fields.protocol.tooltip`),
              value: position.protocol,
              valueId: "topup-information-protocol",
            },
            {
              label: t(`actions.${actionType}.fields.address.label`),
              tooltip: t(`actions.${actionType}.fields.address.tooltip`),
              value: (
                <ExternalLink large link={getEtherscanAddressLink(chainId, position.account)}>
                  {shortenAddress(position.account, 8)}
                </ExternalLink>
              ),
            },
            {
              label: t(`actions.${actionType}.fields.threshold.label`),
              tooltip: t(`actions.${actionType}.fields.threshold.tooltip`),
              value: position.threshold.toString(),
              valueId: "topup-information-threshold",
            },
            {
              label: t(`actions.${actionType}.fields.single.label`),
              tooltip: t(`actions.${actionType}.fields.single.tooltip`),
              value: `${position.singleTopUp.toCryptoString()} ${pool.underlying.symbol}`,
              valueId: "topup-information-single-topup",
            },
            {
              label: t(`actions.${actionType}.fields.max.label`),
              tooltip: t(`actions.${actionType}.fields.max.tooltip`),
              value: `${position.maxTopUp.toCryptoString()} ${pool.underlying.symbol}`,
              valueId: "topup-information-max-topup",
            },
            {
              label: t(`actions.${actionType}.fields.priority.label`),
              tooltip: t(`actions.${actionType}.fields.priority.tooltip`),
              value: `${position.priorityFee.toCryptoString()} Gwei`,
              valueId: "topup-information-priority-fee",
            },
            {
              label: t(`actions.${actionType}.fields.gas.label`),
              tooltip: t(`actions.${actionType}.fields.gas.tooltip`),
              value: `${position.maxGasPrice.toCryptoString()} Gwei`,
              valueId: "topup-information-max-gas",
            },
          ],
          [
            {
              label: t(`actions.${actionType}.stages.confirmation.fees.label`),
              tooltip: t(`actions.${actionType}.stages.confirmation.fees.tooltip.header`),
              tooltipItems: [
                {
                  label: t(`actions.topup.${actionType}.confirmation.fees.tooltip.itemLabels.lps`),
                  value: actionFees ? actionFees.lpFraction.toPercent() : "--%",
                },
                {
                  label: t(
                    `actions.${actionType}.stages.confirmation.fees.tooltip.itemLabels.keepers`
                  ),
                  value: actionFees ? actionFees.keeperFraction.toPercent() : "--%",
                },
                {
                  label: t(
                    `actions.${actionType}.stages.confirmation.fees.tooltip.itemLabels.stakers`
                  ),
                  value: actionFees ? actionFees.treasuryFraction.toPercent() : "--%",
                },
              ],
              value: isMobile
                ? actionFees
                  ? actionFees.total.toPercent()
                  : "--%"
                : t(`actions.${actionType}.stages.confirmation.fees.value`, {
                    percent: actionFees ? actionFees.total.toPercent() : "--%",
                  }),
              valueId: "topup-information-action-fees",
            },
          ],
        ]}
      />
      {value && (
        <InfoSection>
          <InfoRow>
            <InfoLabel>
              {t("actions.gasBank.topupAmount")}
              <MeroTooltip info>{t("actions.gasBank.topupAmountTooltip")}</MeroTooltip>
            </InfoLabel>
            <InfoLabel>
              {value ? `${new ScaledNumber(value).toCryptoString()} ETH` : <Loader />}
            </InfoLabel>
          </InfoRow>
        </InfoSection>
      )}
    </StyledTopupInformation>
  );
};

export default TopupInformation;
