import React from "react";
import styled from "styled-components";

const StyledAccordion = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface HeaderProps {
  open: boolean;
}

const Header = styled.div`
  width: 100%;
  background-color: #1c0c37;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  border-top-right-radius: 1.4rem;
  border-top-left-radius: 1.4rem;
  border-bottom-left-radius: ${(props: HeaderProps) => (props.open ? "0" : "1.4rem")};
  border-bottom-right-radius: ${(props: HeaderProps) => (props.open ? "0" : "1.4rem")};
  padding: 0 1.6rem;
  height: 6.6rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0);
  :hover {
    background-color: #191431;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(21, 14, 59, 0.5);
  border-bottom-right-radius: 1.4rem;
  border-bottom-left-radius: 1.4rem;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
`;

const Line = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, rgba(197, 50, 249, 1), rgba(50, 178, 229, 1));
  opacity: 0.2;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  header: JSX.Element;
  content: JSX.Element;
  open: boolean;
  toggle: () => void;
}

const Accordion = ({ header, content, open, toggle }: Props) => {
  return (
    <StyledAccordion>
      <Header open={open} onClick={() => toggle}>
        {header}
      </Header>
      <Body>
        <Line />
        <Content>{content}</Content>
      </Body>
    </StyledAccordion>
  );
};

export default Accordion;
