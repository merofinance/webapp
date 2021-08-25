import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useIsLive } from "../../app/hooks/use-is-live";
import { AppDispatch } from "../../app/store";
import Button from "../../components/Button";
import { changeNetwork } from "../../lib/web3";
import { setConnecting } from "../../state/userSlice";

interface Props {
  hero?: boolean;
}

const CallToActionButton = ({ hero }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { protocolLive } = useIsLive();
  const { active } = useWeb3React();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  return (
    <Button
      primary
      hero={hero}
      large
      text={!active || protocolLive ? t("landingPage.viewPools") : t("landingPage.changeNetwork")}
      click={() => {
        if (!active) dispatch(setConnecting(true));
        else if (protocolLive) history.push("/pools");
        else changeNetwork(42);
      }}
    />
  );
};

export default CallToActionButton;
