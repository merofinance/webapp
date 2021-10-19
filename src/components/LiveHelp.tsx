import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import AccordionChevron from "./AccordionChevron";
import gradientInfo from "../assets/ui/gradient-info.svg";

interface LiveHelpProps {
  open?: boolean;
  wide?: boolean;
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
  margin-bottom: 2.4rem;

  max-height: ${(props: LiveHelpProps) => (props.open ? "24rem" : "5.4rem")};

  // Background
  border: 1px solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: linear-gradient(#252140, #252140),
    linear-gradient(to right, var(--primary-gradient), var(--secondary-gradient));

  margin-left: 1.6rem;
  width: ${(props: LiveHelpProps) => (props.wide ? "40rem" : "36rem")};
  padding: 2rem 1.8rem;
  @media (max-width: 1439px) {
    margin-left: 0;
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

  margin-bottom: 0.6rem;
  height: 5.4rem;
  padding-left: 1.6rem;
  @media (max-width: 1439px) {
    margin-bottom: 0;
    height: 4.8rem;
    width: 100%;
    background: none;
  }
`;

const HeaderIcon = styled.img`
  width: 2.6rem;
  margin-right: 1rem;
`;

const HeaderText = styled.div`
  font-weight: 700;
  letter-spacing: 0.25px;

  font-size: 2.4rem;
  @media (max-width: 1439px) {
    font-size: 1.8rem;
    line-height: 42px;
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
`;

const Suggestion = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.1rem;
  letter-spacing: 0.42px;
`;

const LiveHelp = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(true);
  const isWide = i18n.language === "ja";

  return (
    <StyledLiveHelp open={open} wide={isWide}>
      <ChevronContainer>
        <AccordionChevron open={open} />
      </ChevronContainer>
      <Header onClick={() => setOpen(!open)}>
        <HeaderIcon src={gradientInfo} />
        <HeaderText>{t("liveHelp.header")}</HeaderText>
      </Header>
      <Content>
        <Suggestion>
          We notice you have entered a threshold top-up of 1.1. This is very close to liquidation
          and in times of market volatility we suggest at least 1.2 or more.
        </Suggestion>
      </Content>
    </StyledLiveHelp>
  );
};

export default LiveHelp;
