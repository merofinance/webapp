import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { AppDispatch } from "../app/store";
import { selectError, setError } from "../state/errorSlice";
import { GradientLink } from "../styles/GradientText";
import { Paragraph } from "../styles/Headers";
import Button from "./Button";
import Popup from "./Popup";
import { changeNetwork } from "../lib/web3";

const Text = styled(Paragraph)`
  width: 100%;
  margin-bottom: 3rem;
  text-align: center;
`;

const Link = styled(GradientLink)`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;
  margin-left: 0.5rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;

const ErrorAlert = (): JSX.Element => {
  const { t } = useTranslation();
  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(setError({ message: "" }));
    if (error.redirectOnClose && location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <Popup
      centerHeader
      show={error.message.length > 0}
      close={handleClose}
      header={error.title ? t(error.title) : t("errors.header")}
    >
      <Text>{t(error.message)}</Text>
      {error.hideContact ? null : (
        <Text>
          {t("errors.support")}
          <Link href="https://discord.gg/jpGvaFV3Rv" target="_blank" rel="noopener noreferrer">
            {t("footer.community.links.discord")}
          </Link>
        </Text>
      )}
      {error.switchToMainnetButton && (
        <Button wide medium primary click={() => changeNetwork(1)}>
          {t("errors.switchToMainnet")}
        </Button>
      )}
      {!error.hideButton && (
        <Button wide medium primary click={handleClose}>
          {t("components.close")}
        </Button>
      )}
    </Popup>
  );
};

export default ErrorAlert;
