import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import AccordionChevron from "./AccordionChevron";
import logo from "../assets/logo/logo.svg";
import {
  addSuggestion,
  ignoreSuggestion,
  implementSuggestion,
  removeSuggestion,
  selectImplement,
  selectSuggestions,
  SuggestionType,
} from "../state/helpSlice";
import Button from "./Button";
import { selectPositions } from "../state/positionsSlice";
import { Position } from "../lib/types";

const Container = styled.div`
  position: relative;
  margin-bottom: 2.4rem;

  margin-left: 1.6rem;
  @media (max-width: 1439px) {
    margin-left: 0;
  }
`;

interface LiveHelpProps {
  open?: boolean;
  wide?: boolean;
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

  max-height: ${(props: LiveHelpProps) =>
    props.open ? `calc(25rem * ${props.suggestions})` : "5.4rem"};

  // Background
  border: 1px solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: linear-gradient(#252140, #252140),
    linear-gradient(to right, var(--primary-gradient), var(--secondary-gradient));

  width: ${(props: LiveHelpProps) => (props.wide ? "40rem" : "36rem")};
  padding: 2rem 1.8rem;
  @media (max-width: 1439px) {
    width: 100%;
    padding: 1.6rem;
    max-height: ${(props: LiveHelpProps) => (props.open ? "19rem" : "4.8rem")};
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
  @media (max-width: 1439px) {
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
  @media (max-width: 1439px) {
    height: 4.8rem;
    margin-right: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 3.6rem;
  @media (max-width: 1439px) {
    margin-top: 3.2rem;
  }

  > div:first-child {
    margin-top: 0;
  }
`;

const Suggestion = styled.div`
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
  @media (max-width: 1439px) {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

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

const LiveHelp = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const suggestions = useSelector(selectSuggestions);
  const implement = useSelector(selectImplement);
  const positions = useSelector(selectPositions);
  const [open, setOpen] = useState(false);
  const isWide = i18n.language === "ja";
  const hasSuggestions = suggestions.length > 0;

  const lowPositions = positions.filter((position: Position) =>
    position.singleTopUp.gt(position.maxTopUp)
  );
  const hasLowPositions = lowPositions.length > 0;

  useEffect(() => {
    setOpen(hasSuggestions);
  }, [hasSuggestions]);

  useEffect(() => {
    if (hasLowPositions) {
      lowPositions.forEach((position: Position) =>
        dispatch(
          addSuggestion({
            value: `${position.protocol.toLowerCase()}-low`,
            label: t("liveHelp.suggestions.topupPositionLow", { protocol: position.protocol }),
          })
        )
      );
    } else {
      dispatch(removeSuggestion(`aave-low`));
      dispatch(removeSuggestion(`compound-low`));
    }
  }, [hasLowPositions]);

  useEffect(() => {
    if (
      (implement === "aave-low" || implement === "compound-low") &&
      location.pathname !== "/actions"
    ) {
      history.push("/actions");
    }
  }, [implement, location]);

  if (!hasSuggestions) return <></>;

  return (
    <Container>
      <StyledLiveHelp open={open} wide={isWide} suggestions={suggestions.length}>
        <ChevronContainer>
          <AccordionChevron open={open} />
        </ChevronContainer>
        <Header onClick={() => setOpen(!open)}>{t("liveHelp.header")}</Header>
        <Content>
          {suggestions.map((suggestion: SuggestionType) => (
            <Suggestion key={suggestion.value}>
              <SuggestionText>{suggestion.label}</SuggestionText>
              <ButtonContainer>
                <Button
                  primary
                  small
                  text="implement"
                  click={() => dispatch(implementSuggestion(suggestion.value))}
                  width="10rem"
                />
                <Button
                  small
                  text="ignore"
                  background="#252140"
                  width="10rem"
                  click={() => dispatch(ignoreSuggestion(suggestion.value))}
                />
              </ButtonContainer>
            </Suggestion>
          ))}
        </Content>
      </StyledLiveHelp>
      <BackdHelper src={logo} />
    </Container>
  );
};

export default LiveHelp;
