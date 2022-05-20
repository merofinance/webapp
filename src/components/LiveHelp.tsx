import { useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import AccordionChevron from "./AccordionChevron";
import logo from "../assets/logo/logo.svg";
import {
  ignoreSuggestion,
  implementSuggestion,
  removeSuggestion,
  selectActiveSuggestion,
  selectSuggestions,
  Suggestion,
  SuggestionType,
  addSuggestions,
} from "../state/helpSlice";
import Button from "./Button";
import { selectPositions } from "../state/positionsSlice";
import { Optional, Position } from "../lib/types";
import { GradientLink } from "../styles/GradientText";
import { useNavigateToTop } from "../app/hooks/use-navigate-to-top";
import { DOCS_TOPUPS_LINK } from "../lib/links";

const Container = styled.div`
  position: relative;
  margin-bottom: 2.4rem;
`;

interface LiveHelpProps {
  open?: boolean;
  suggestions: number;
}

const StyledLiveHelp = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(37, 33, 64, 0.4);
  border-radius: 1.4rem;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  overflow: hidden;
  transition: max-height 0.3s ease-out, background-color 0.3s, filter 0.3s;
  width: 36rem;
  padding: 2rem 1.8rem;

  max-height: ${(props: LiveHelpProps) =>
    props.open ? `calc(28rem * ${props.suggestions})` : "5.4rem"};
  // Background
  border: 1px solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: linear-gradient(var(--bg-light), var(--bg-light)),
    linear-gradient(to right, var(--primary-gradient), var(--secondary-gradient));

  @media (max-width: 1220px) {
    width: 100%;
    padding: 1.6rem;
    max-height: ${(props: LiveHelpProps) =>
      props.open ? `calc(19rem * ${props.suggestions})` : "4.8rem"};
  }

  filter: brightness(1);
  :hover {
    filter: brightness(1.15);
  }
`;

const Header = styled.button`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 700;
  letter-spacing: 0.25px;

  margin-bottom: 0.6rem;
  height: 5.4rem;
  padding-left: 5rem;
  font-size: 2.4rem;
  padding-bottom: 0.5rem;
  @media (max-width: 1220px) {
    margin-bottom: 0;
    height: 4.8rem;
    width: 100%;
    background: none;
    font-size: 1.8rem;
  }
`;

const ChevronContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;

  height: 5.4rem;
  margin-right: 0.2rem;
  padding-bottom: 0.2rem;
  @media (max-width: 1220px) {
    height: 4.8rem;
    margin-right: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 3.6rem;
  @media (max-width: 1220px) {
    margin-top: 3.2rem;
  }

  > div:first-child {
    margin-top: 0;
  }
`;

const StyledSuggestion = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const SuggestionText = styled.div`
  font-weight: 400;
  letter-spacing: 0.42px;

  font-size: 1.5rem;
  line-height: 2.1rem;
  @media (max-width: 1220px) {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const DocsLink = styled(GradientLink)`
  font-weight: 400;
  letter-spacing: 0.42px;

  font-size: 1.5rem;
  line-height: 2.1rem;
  @media (max-width: 1220px) {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

const NfaText = styled.div`
  font-weight: 400;
  letter-spacing: 0.42px;
  font-style: italic;
  margin-top: 0.4rem;

  font-size: 1rem;
  line-height: 2.1rem;
  @media (max-width: 1220px) {
    font-size: 0.8rem;
    line-height: 1.7rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.3rem;

  button {
    margin-right: 1rem;
  }
`;

const BackdHelper = styled.img`
  left: -1rem;
  top: -1rem;
  position: absolute;
  width: 4.8rem;
  margin-right: 1rem;
`;

const LiveHelp = (): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigateToTop();
  const location = useLocation();
  const suggestions = useSelector(selectSuggestions);
  const implement = useSelector(selectActiveSuggestion);
  const positions = useSelector(selectPositions);
  const [open, setOpen] = useState(false);
  const hasSuggestions = suggestions.length > 0;

  const lowPositions =
    positions?.filter((position: Position) => position.singleTopUp.gt(position.maxTopUp)) || [];
  const hasLowPositions = lowPositions.length > 0;

  useEffect(() => {
    setOpen(hasSuggestions);
    return () => {
      setOpen(false);
    };
  }, [hasSuggestions]);

  useEffect(() => {
    if (!hasLowPositions) {
      dispatch(removeSuggestion(SuggestionType.POSITION_LOW));
      return;
    }
    dispatch(
      addSuggestions(
        lowPositions.map((position: Position) => {
          return {
            type: SuggestionType.POSITION_LOW,
            data: position.protocol.toLowerCase(),
            text: t("liveHelp.suggestions.topupPositionLow.text", {
              protocol: position.protocol,
            }),
            button: t("liveHelp.suggestions.topupPositionLow.button"),
            link: DOCS_TOPUPS_LINK,
          };
        })
      )
    );
  }, [hasLowPositions]);

  useEffect(() => {
    if (
      implement &&
      implement.type === SuggestionType.POSITION_LOW &&
      location.pathname !== "/actions"
    ) {
      navigate("/actions");
    }
  }, [implement, location]);

  if (!hasSuggestions) return null;

  return (
    <Container id="live-help">
      <StyledLiveHelp open={open} suggestions={suggestions.length}>
        <ChevronContainer>
          <AccordionChevron open={open} />
        </ChevronContainer>
        <Header onClick={() => setOpen(!open)}>{t("liveHelp.header")}</Header>
        <Content>
          {suggestions.map((suggestion: Suggestion) => (
            <StyledSuggestion key={suggestion.type}>
              <SuggestionText>
                {suggestion.text}{" "}
                <Trans i18nKey="liveHelp.readMore">
                  <DocsLink href={suggestion.link} target="_blank" rel="noopener noreferrer">
                    link
                  </DocsLink>
                </Trans>
              </SuggestionText>
              <NfaText>{t("liveHelp.disclaimer")}</NfaText>
              <ButtonContainer>
                <Button
                  id="live-help-implement"
                  primary
                  small
                  click={() => dispatch(implementSuggestion(suggestion))}
                >
                  {suggestion.button}
                </Button>
                <Button
                  small
                  background="var(--bg-light)"
                  width="10rem"
                  click={() => dispatch(ignoreSuggestion(suggestion.type))}
                >
                  {t("liveHelp.buttons.ignore")}
                </Button>
              </ButtonContainer>
            </StyledSuggestion>
          ))}
        </Content>
      </StyledLiveHelp>
      <BackdHelper src={logo} />
    </Container>
  );
};

export default LiveHelp;
