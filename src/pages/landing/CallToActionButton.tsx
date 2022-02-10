import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

interface Props {
  hero?: boolean;
}

const CallToActionButton = ({ hero }: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button primary hero={hero} large click={() => navigate("/pools")}>
      {t("landingPage.viewPools")}
    </Button>
  );
};

export default CallToActionButton;
