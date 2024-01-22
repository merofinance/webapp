import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";

import { Optional } from "../lib/types";
import { Pool } from "../lib";
import { dismissPausedSnackbar, selectPausedSnackbarDismissed } from "../state/uiSlice";
import exit from "../assets/ui/snackbar-exit.svg";
import { DISCORD_LINK } from "../lib/links";

const Border = styled.div`
  position: relative;
  padding: 2px;
  background: var(--gradient);
  border-radius: 1.4rem;

  margin-bottom: 2.6rem;
  @media (max-width: 600px) {
    margin-bottom: 2.4rem;
  }
`;

const StyledPausedSnackbar = styled.div`
  width: 100%;
  padding: 0.7rem 1.6rem;
  border-radius: 1.4rem;
  background: rgba(10, 6, 34, 0.8);
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  color: white;
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
  color: white;
  font-weight: 500;
  letter-spacing: 0.15px;
  text-decoration: underline;

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

  const paused = pool && (pool.isPaused || pool.isShutdown);

  if (!paused || dismissed) return null;

  return (
    <Border>
      <StyledPausedSnackbar>
        <Text>
          <Trans i18nKey="components.pausedSnackbar">
            <Link href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
              {t("footer.community.links.discord")}
            </Link>
          </Trans>
        </Text>
        <ExitButton onClick={() => dispatch(dismissPausedSnackbar())}>
          <ExitIcon src={exit} />
        </ExitButton>
      </StyledPausedSnackbar>
    </Border>
  );
};

export default PausedSnackbar;
