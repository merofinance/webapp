import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Popup from "../../components/Popup";

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  show: boolean;
  close: () => void;
}

const StakeConfirmation = ({ show, close }: Props) => {
  const { t } = useTranslation();

  return (
    <Popup
      show={show}
      close={close}
      header={t("bkd.stake.confirmation.header")}
      content={<Content>todo</Content>}
    />
  );
};

export default StakeConfirmation;
