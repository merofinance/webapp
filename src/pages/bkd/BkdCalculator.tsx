import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDevice } from "../../app/hooks/use-device";
import BackdTooltip from "../../components/Tooltip";
import { ScaledNumber } from "../../lib/scaled-number";

const Container = styled.div`
  width: 100%;
  background: rgba(26, 23, 45, 1);
  border: solid 1px rgba(44, 41, 63, 1);
  box-shadow: 0px 0px 12px 0px rgba(23, 18, 22, 0.05);

  border-radius: 1.4rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 2.1rem;

  margin-top: 3.5rem;
  @media (max-width: 600px) {
    margin-top: 1.8rem;
    padding: 1.4rem 1.8rem;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.15px;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

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

const BkdCalculator = ({ amount, withdraw }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const hasStaked = true; // TODO

  return (
    <Container>
      <Row>
        <Label>
          {isMobile
            ? t("bkd.stake.calculator.earnings.labelMobile")
            : t("bkd.stake.calculator.earnings.label")}
          <BackdTooltip>{t("bkd.stake.calculator.earnings.tooltip")}</BackdTooltip>
        </Label>
        <Label>{hasStaked && <SubLabel>$23.32 → </SubLabel>}32.23</Label>
      </Row>
      <Row>
        <Label>
          {t("bkd.stake.calculator.boost.label")}
          <BackdTooltip>{t("bkd.stake.calculator.boost.tooltip")}</BackdTooltip>
        </Label>
        <Label>{hasStaked && <SubLabel>2.6x →</SubLabel>}2.4x</Label>
      </Row>
      {!withdraw && (
        <Row>
          <Label>
            {isMobile
              ? t("bkd.stake.calculator.full.labelMobile")
              : t("bkd.stake.calculator.full.label")}
            <BackdTooltip>{t("bkd.stake.calculator.full.tooltip")}</BackdTooltip>
          </Label>
          <Label>{hasStaked && !isMobile && <SubLabel>Oct-23-2022 → </SubLabel>}Jan-01-2023</Label>
        </Row>
      )}
    </Container>
  );
};

export default BkdCalculator;
