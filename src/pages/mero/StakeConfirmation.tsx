import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ScaledNumber } from "scaled-number";

import ExternalLink from "../../components/ExternalLink";
import Notice from "../../components/Notice";
import Popup from "../../components/Popup";
import MeroCalculator from "./MeroCalculator";
import { DOCS_TOKENOMICS_LINK } from "../../lib/links";

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
      header={t("mero.stake.confirmation.header")}
      submit={() => console.log("TODO")}
      confirmationText={t("mero.stake.confirmation.action")}
    >
      <Description>
        {t("mero.stake.confirmation.description", { amount: amount.toCryptoString() })}
      </Description>
      <ExternalLink link={DOCS_TOKENOMICS_LINK}>{t("components.moreInDocs")}</ExternalLink>
      <MeroCalculator amount={amount} />
      <Notice>{t("mero.stake.confirmation.notice")}</Notice>
    </Popup>
  );
};

export default StakeConfirmation;
