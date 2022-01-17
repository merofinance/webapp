import { useTranslation } from "react-i18next";
import styled from "styled-components";
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
  padding: 1.8rem 2.3rem;

  margin-top: 3.5rem;
  @media (max-width: 600px) {
    margin-top: 1.8rem;
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

interface Props {
  amount: ScaledNumber;
  withdraw?: boolean;
}

const BkdCalculator = ({ amount, withdraw }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        <Label>
          {t("bkd.stake.calculator.earnings.label")}
          <BackdTooltip content={t("bkd.stake.calculator.earnings.tooltip")} />
        </Label>
        <Label>$23.32 → $32.23</Label>
      </Row>
      <Row>
        <Label>
          {t("bkd.stake.calculator.boost.label")}
          <BackdTooltip content={t("bkd.stake.calculator.boost.tooltip")} />
        </Label>
        <Label>2.6x → 2.4x</Label>
      </Row>
      {!withdraw && (
        <Row>
          <Label>
            {t("bkd.stake.calculator.full.label")}
            <BackdTooltip content={t("bkd.stake.calculator.full.tooltip")} />
          </Label>
          <Label>22.01.2023</Label>
        </Row>
      )}
    </Container>
  );
};

export default BkdCalculator;
