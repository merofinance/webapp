import { useEffect, useState } from "react";
import styled from "styled-components";
import AccordionChevron from "./AccordionChevron";

interface StyleProps {
  collapsible?: boolean;
  open?: boolean;
}

const StyledInfoCard = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(37, 33, 64, 0.4);
  border-radius: 1.4rem;
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  overflow: hidden;
  transition: max-height 0.3s ease-out, background-color 0.3s;
  margin-bottom: 2.4rem;

  max-height: ${(props: StyleProps) =>
    !props.collapsible ? "auto" : props.open ? "24rem" : "5.4rem"};

  padding: 2rem 1.8rem;
  @media (max-width: 1220px) {
    padding: 1.6rem;
    max-height: ${(props: StyleProps) => (props.open ? "19rem" : "4.8rem")};
  }

  :hover {
    background-color: ${(props: StyleProps) =>
      props.collapsible ? "#181532" : "rgba(37, 33, 64, 0.4)"};
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
  height: ${(props: StyleProps) => (props.collapsible ? "5.4rem" : "auto")};
  width: ${(props: StyleProps) => (props.collapsible ? "100%" : "auto")};

  font-size: 2.4rem;
  margin-bottom: 0.6rem;
  @media (max-width: 1220px) {
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5.4rem;
  display: ${(props: StyleProps) => (props.collapsible ? "flex" : "none")};
  margin-right: 0.2rem;

  @media (max-width: 1220px) {
    height: 4.8rem;
    display: flex;
    margin-right: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: ${(props: StyleProps) => (props.collapsible ? "3.6rem" : "0")};

  @media (max-width: 1220px) {
    margin-top: 3.2rem;
  }
`;

interface Props {
  header: string;
  content: JSX.Element;
  collapsible?: boolean;
  defaultOpen?: boolean;
  id?: string;
}

const InfoCard = ({ header, content, collapsible, defaultOpen, id }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(!!defaultOpen);
  }, []);

  return (
    <StyledInfoCard id={id} open={open} collapsible={collapsible}>
      <ChevronContainer collapsible={collapsible}>
        <AccordionChevron open={open} />
      </ChevronContainer>
      <Header id={`${id}-header`} onClick={() => setOpen(!open)} collapsible={collapsible}>
        {header}
      </Header>
      <Content collapsible={collapsible}>{content}</Content>
    </StyledInfoCard>
  );
};

export default InfoCard;
