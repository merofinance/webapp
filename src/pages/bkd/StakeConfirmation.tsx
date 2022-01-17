import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ExternalLink from "../../components/ExternalLink";
import Popup from "../../components/Popup";
import { ScaledNumber } from "../../lib/scaled-number";

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  width: 100%;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
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
      show
      close={close}
      header={t("bkd.stake.confirmation.header")}
      content={
        <Content>
          <Description>
            {t("bkd.stake.confirmation.description", { amount: amount.toCryptoString() })}
          </Description>
          <ExternalLink
            label="components.moreInDocs"
            link="https://docs.backd.fund/protocol-architecture/tokenomics"
          />
        </Content>
      }
    />
  );
};

export default StakeConfirmation;
