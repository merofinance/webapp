import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ScaledNumber } from "scaled-number";

import { useDevice } from "../../app/hooks/use-device";
import InfoBlock, { InfoBlockRow } from "../../components/InfoBlock";

const SubLabel = styled.span`
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.15px;
  color: #b0afba;
  margin-right: 0.6rem;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

interface Props {
  amount: ScaledNumber;
  withdraw?: boolean;
}

const MeroCalculator = ({ amount, withdraw }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const hasStaked = true; // TODO

  const infoBlockRows: InfoBlockRow[] = [
    {
      label: isMobile
        ? t("mero.stake.calculator.earnings.labelMobile")
        : t("mero.stake.calculator.earnings.label"),
      tooltip: t("mero.stake.calculator.earnings.tooltip"),
      value: <>{hasStaked && <SubLabel>$23.32 → </SubLabel>}32.23</>,
    },
    {
      label: t("mero.stake.calculator.boost.label"),
      tooltip: t("mero.stake.calculator.boost.tooltip"),
      value: <>{hasStaked && <SubLabel>2.6x → </SubLabel>}2.4x</>,
    },
  ];

  if (!withdraw)
    infoBlockRows.push({
      label: isMobile
        ? t("mero.stake.calculator.full.labelMobile")
        : t("mero.stake.calculator.full.label"),
      tooltip: t("mero.stake.calculator.full.tooltip"),
      value: <> {hasStaked && !isMobile && <SubLabel>Oct-23-2022 → </SubLabel>}Jan-01-2023 </>,
    });

  return <InfoBlock sections={[infoBlockRows]} />;
};

export default MeroCalculator;
