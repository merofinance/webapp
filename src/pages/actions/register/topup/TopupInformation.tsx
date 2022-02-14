import { useSelector } from "react-redux";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";

import { GradientLink } from "../../../../styles/GradientText";
import BackdTooltip from "../../../../components/BackdTooltip";
import { shortenAddress } from "../../../../lib/text";
import { ScaledNumber } from "../../../../lib/scaled-number";
import { Optional, Pool, Position } from "../../../../lib/types";
import { selectPrice } from "../../../../state/selectors";
import { useDevice } from "../../../../app/hooks/use-device";
import { getEtherscanAddressLink } from "../../../../lib/web3";
import { selectActionFees } from "../../../../state/positionsSlice";
import Loader from "../../../../components/Loader";
import InfoBlock, { InfoBlockRow } from "../../../../components/InfoBlock";

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
`;

const Address = styled(GradientLink)`
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  cursor: pointer;
  margin-left: 0.5rem;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
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

const AddressLabel = styled(GradientLink)`
  font-weight: 500;
  letter-spacing: 0.15px;
  cursor: pointer;

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

  return (
    <StyledTopupInformation>
      <Summary>
        {t("actions.topup.stages.confirmation.summaryStart")}
        <Address
          href={getEtherscanAddressLink(chainId, position.account)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortenAddress(position.account, isMobile ? 10 : 26)}
          <LaunchIcon style={{ fill: "var(--secondary)" }} />
        </Address>
        {t("actions.topup.stages.confirmation.summaryEnd", {
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
              label: t("actions.topup.fields.protocol.label"),
              tooltip: t("actions.topup.fields.protocol.tooltip"),
              value: position.protocol,
              valueId: "topup-information-protocol",
            },
            {
              label: t("actions.topup.fields.address.label"),
              tooltip: t("actions.topup.fields.address.tooltip"),
              value: (
                <AddressLabel
                  href={getEtherscanAddressLink(chainId, position.account)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenAddress(position.account, 8)}
                  <LaunchIcon style={{ fill: "var(--secondary)" }} />
                </AddressLabel>
              ),
            },
            {
              label: t("actions.topup.fields.threshold.label"),
              tooltip: t("actions.topup.fields.threshold.tooltip"),
              value: position.threshold.toString(),
              valueId: "topup-information-threshold",
            },
            {
              label: t("actions.topup.fields.single.label"),
              tooltip: t("actions.topup.fields.single.tooltip"),
              value: `${position.singleTopUp.toCryptoString()} ${pool.underlying.symbol}`,
              valueId: "topup-information-single-topup",
            },
            {
              label: t("actions.topup.fields.max.label"),
              tooltip: t("actions.topup.fields.max.tooltip"),
              value: `${position.maxTopUp.toCryptoString()} ${pool.underlying.symbol}`,
              valueId: "topup-information-max-topup",
            },
            {
              label: t("actions.topup.fields.priority.label"),
              tooltip: t("actions.topup.fields.priority.tooltip"),
              value: `${position.priorityFee.toCryptoString()} Gwei`,
              valueId: "topup-information-priority-fee",
            },
            {
              label: t("actions.topup.fields.gas.label"),
              tooltip: t("actions.topup.fields.gas.tooltip"),
              value: `${position.maxGasPrice.toCryptoString()} Gwei`,
              valueId: "topup-information-max-gas",
            },
          ],
          [
            {
              label: t("actions.topup.stages.confirmation.fees.label"),
              tooltip: t("actions.topup.stages.confirmation.fees.tooltip.header"),
              tooltipItems: [
                {
                  label: t("actions.topup.stages.confirmation.fees.tooltip.itemLabels.lps"),
                  value: actionFees ? actionFees.lpFraction.toPercent() : "--%",
                },
                {
                  label: t("actions.topup.stages.confirmation.fees.tooltip.itemLabels.keepers"),
                  value: actionFees ? actionFees.keeperFraction.toPercent() : "--%",
                },
                {
                  label: t("actions.topup.stages.confirmation.fees.tooltip.itemLabels.stakers"),
                  value: actionFees ? actionFees.treasuryFraction.toPercent() : "--%",
                },
              ],
              value: isMobile
                ? actionFees
                  ? actionFees.total.toPercent()
                  : "--%"
                : t("actions.topup.stages.confirmation.fees.value", {
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
              <BackdTooltip info>{t("actions.gasBank.topupAmountTooltip")}</BackdTooltip>
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
