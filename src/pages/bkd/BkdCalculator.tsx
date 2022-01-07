import { useTranslation } from "react-i18next";
import styled from "styled-components";
import BackdTooltip from "../../components/Tooltip";
import { ScaledNumber } from "../../lib/scaled-number";

const Container = styled.div`
  width: 100%;
  background: rgba(37, 33, 64, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  border-radius: 1.4rem;
  display: flex;
  flex-direction: column;
  padding: 1.8rem 2.3rem;

  margin-top: 3.5rem;
  @media (max-width: 600px) {
    margin-top: 1.8rem;
  }
`;

const Header = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 1.7rem;
  margin-top: 0.3rem;
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
  amount: ScaledNumber;
}

const BkdCalculator = ({ amount }: Props) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header>{t("bkd.stake.calculator.header")}</Header>
      <Row>
        <Label>
          {t("bkd.stake.calculator.boost.label")}
          <BackdTooltip content={t("bkd.stake.calculator.boost.tooltip")} />
        </Label>
        <Label>2.6x → 2.4x</Label>
      </Row>
      <Row>
        <Label>
          {t("bkd.stake.calculator.full.label")}
          <BackdTooltip content={t("bkd.stake.calculator.full.tooltip")} />
        </Label>
        <Label>22.01.2023</Label>
      </Row>
    </Container>
  );
};

export default BkdCalculator;
