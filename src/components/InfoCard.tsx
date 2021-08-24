import React, { useState } from "react";
import styled from "styled-components";
import AccordionChevron from "./AccordionChevron";

interface StyleProps {
  collapsible?: boolean;
  open?: boolean;
}

const StyledOverview = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(37, 33, 64, 0.4);
  border-radius: 1.4rem;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);

  max-height: ${(props: StyleProps) => (props.open && props.collapsible ? "15rem" : "none")};

  margin-left: 1.6rem;
  width: 40rem;
  padding: 2rem 1.8rem;
  @media (max-width: 1439px) {
    margin-left: 0;
    width: 100%;
    margin-bottom: 2.4rem;
    padding: 1.6rem;
    transition: max-height 0.3s ease-out;
    max-height: ${(props: StyleProps) => (props.open ? "15rem" : "4.8rem")};
    overflow: hidden;
  }
`;

const Header = styled.button`
  font-weight: 700;
  letter-spacing: 0.25px;
  text-align: left;
  top: 0;
  left: 0;

  position: ${(props: StyleProps) => (props.collapsible ? "absolute" : "relative")};
  cursor: ${(props: StyleProps) => (props.collapsible ? "pointer" : "auto")};
  padding-left: ${(props: StyleProps) => (props.collapsible ? "1.6rem" : "0")};

  font-size: 2.4rem;
  margin-bottom: 0.6rem;
  @media (max-width: 1439px) {
    position: absolute;
    margin-bottom: 0;
    height: 4.8rem;
    width: 100%;
    font-size: 1.8rem;
    cursor: pointer;
    background: none;
    padding-left: 1.6rem;
    line-height: 42px;
  }
`;

const ChevronContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1440px) {
    display: ${(props: StyleProps) => (props.collapsible ? "flex" : "none")};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 1439px) {
    margin-top: 3.2rem;
  }
`;

type Props = {
  header: string;
  content: JSX.Element;
  collapsible?: boolean;
};

const InfoCard = ({ header, content, collapsible }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <StyledOverview open={open} collapsible={collapsible}>
      <ChevronContainer collapsible={collapsible}>
        <AccordionChevron open={open} />
      </ChevronContainer>
      <Header onClick={() => setOpen(!open)} collapsible={collapsible}>
        {header}
      </Header>
      <Content>{content}</Content>
    </StyledOverview>
  );
};

export default InfoCard;
