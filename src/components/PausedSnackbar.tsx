import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";

import { Optional } from "../lib/types";
import { Pool } from "../lib";
import { dismissPausedSnackbar, selectPausedSnackbarDismissed } from "../state/uiSlice";
import exit from "../assets/ui/snackbar-exit.svg";
import { DISCORD_LINK, TWITTER_LINK } from "../lib/constants";

const StyledPausedSnackbar = styled.div`
  width: 100%;
  padding: 0.7rem 1.6rem;
  border-radius: 1.4rem;
  background-color: rgba(3, 184, 255, 0.2);
  border: 2px solid var(--info);
  display: flex;
  justify-content: space-between;

  margin-bottom: 2.6rem;
  @media (max-width: 600px) {
    margin-bottom: 2.4rem;
  }
`;

const Text = styled.div`
  color: var(--info);
  font-weight: 500;
  letter-spacing: 0.15px;

  font-size: 1.6rem;
  line-height: 2.8rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    line-height: 1.8rem;
  }
`;

const Link = styled.a`
  color: var(--info);
  font-weight: 500;
  letter-spacing: 0.15px;
  text-decoration: underline;
  margin-left: 0.4rem;

  font-size: 1.6rem;
  line-height: 2.8rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    line-height: 1.8rem;
  }
`;

const ExitButton = styled.button`
  cursor: pointer;
  margin-left: 1rem;
  padding: 0.6rem 0;
  height: 2rem;

  @media (max-width: 600px) {
  }
`;

const ExitIcon = styled.img`
  width: 1.4rem;
`;

interface Props {
  pool: Optional<Pool>;
}

const PausedSnackbar = ({ pool }: Props): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dismissed = useSelector(selectPausedSnackbarDismissed);

  if (!pool || !pool.isPaused || dismissed) return null;

  return (
    <StyledPausedSnackbar>
      <Text>
        <Trans i18nKey="components.pausedSnackbar">
          <Link href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
            {t("footer.community.links.twitter")}
          </Link>
          <Link href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            {t("footer.community.links.discord")}
          </Link>
        </Trans>
      </Text>
      <ExitButton onClick={() => dispatch(dismissPausedSnackbar())}>
        <ExitIcon src={exit} />
      </ExitButton>
    </StyledPausedSnackbar>
  );
};

export default PausedSnackbar;
