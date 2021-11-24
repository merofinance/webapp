import { ReactNode } from "react";
import styled from "styled-components";

const StyledAccordion = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-bottom: 4.8rem;
  @media (max-width: 600px) {
    margin-bottom: 1.8rem;
  }
`;

interface HeaderProps {
  open: boolean;
}

const Header = styled.div`
  position: relative;
  width: 100%;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  border-top-right-radius: 1.4rem;
  border-top-left-radius: 1.4rem;

  transition: background-color 0.3s, border 0.3s,
    border-bottom-left-radius 0s ${(props: HeaderProps) => (props.open ? "0s" : "0.3s")},
    border-bottom-right-radius 0s ${(props: HeaderProps) => (props.open ? "0s" : "0.3s")};
  border-bottom-left-radius: ${(props: HeaderProps) => (props.open ? "0" : "1.4rem")};
  border-bottom-right-radius: ${(props: HeaderProps) => (props.open ? "0" : "1.4rem")};

  background-color: #1c0c37;
  border: 1px solid rgba(255, 255, 255, 0);

  :hover {
    background-color: #191431;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

interface BodyProps {
  open: boolean;
}

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(21, 14, 59, 0.5);
  border-bottom-right-radius: 1.4rem;
  border-bottom-left-radius: 1.4rem;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  overflow: hidden;

  transition: max-height 0.3s ease-out;
  max-height: ${(props: BodyProps) => (props.open ? "300px" : "0")};
  @media (max-width: 600px) {
    max-height: ${(props: BodyProps) => (props.open ? "400px" : "0")};
  }
`;

const BodyContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  children: ReactNode;
  open: boolean;
}

const Accordion = ({ header, children, open }: Props): JSX.Element => {
  return (
    <StyledAccordion>
      <Header open={open}>{header}</Header>
      <Body open={open}>
        <BodyContent>
          <Line />
          <Content>{children}</Content>
        </BodyContent>
      </Body>
    </StyledAccordion>
  );
};

export default Accordion;
