import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ExternalLink from "../../components/ExternalLink";
import Notice from "../../components/Notice";
import Popup from "../../components/Popup";
import { ScaledNumber } from "../../lib/scaled-number";
import BkdCalculator from "./BkdCalculator";

const Content = styled.div`
  display: flex;
  flex-direction: column;

  > div:last-child {
    margin-top: 3.4rem;
    @media (max-width: 600px) {
      margin-top: 1.8rem;
    }
  }
`;

const Description = styled.div`
  width: 100%;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 0.5rem;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    line-height: 2.1rem;
  }
`;

interface Props {
  show: boolean;
  close: () => void;
  amount: ScaledNumber;
}

const StakeConfirmation = ({ show, close, amount }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Popup
      show={show}
      close={close}
      header={t("bkd.stake.confirmation.header")}
      submit={() => console.log("TODO")}
      confirmationText={t("bkd.stake.confirmation.action")}
    >
      <Content>
        <Description>
          {t("bkd.stake.confirmation.description", { amount: amount.toCryptoString() })}
        </Description>
        <ExternalLink link="https://docs.backd.fund/protocol-architecture/tokenomics">
          {t("components.moreInDocs")}
        </ExternalLink>
        <BkdCalculator amount={amount} />
        <Notice>{t("bkd.stake.confirmation.notice")}</Notice>
      </Content>
    </Popup>
  );
};

export default StakeConfirmation;
