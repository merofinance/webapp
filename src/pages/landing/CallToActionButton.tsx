import { useWeb3React } from "@web3-react/core";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useIsLive } from "../../app/hooks/use-is-live";
import Button from "../../components/Button";
import { changeNetwork } from "../../lib/web3";

interface Props {
  hero?: boolean;
}

const CallToActionButton = ({ hero }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { protocolLive } = useIsLive();
  const { active } = useWeb3React();
  const navigate = useNavigate();

  return (
    <Button
      primary
      hero={hero}
      large
      click={() => {
        if (!active || protocolLive) navigate("/pools");
        else changeNetwork(42);
      }}
    >
      {!active || protocolLive ? t("landingPage.viewPools") : t("landingPage.changeNetwork")}
    </Button>
  );
};

export default CallToActionButton;
