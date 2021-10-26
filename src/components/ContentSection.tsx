import React from "react";
import styled from "styled-components";

const StyledContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 1.4rem;
  background-color: rgba(21, 14, 59, 0.5);
`;

const Header = styled.h2`
  background-color: rgba(252, 40, 211, 0.05);
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  font-weight: 700;
  letter-spacing: 0.25px;
  border-top-right-radius: 1.4rem;
  border-top-left-radius: 1.4rem;

  font-size: 2.4rem;
  padding: 2rem 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.8rem;
    padding: 1.6rem;
  }
`;

type LineProps = {
  large?: boolean;
};

const Line = styled.div`
  width: 100%;
  height: ${(props: LineProps) => (props.large ? "5px" : "2px")};
  background: var(--gradient);
  opacity: 0.2;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 1.6rem;
`;

type Props = {
  header: string;
  statistics: JSX.Element;
  content: JSX.Element;
};

const ContentSection = ({ header, statistics, content }: Props): JSX.Element => {
  return (
    <StyledContentSection>
      <Header id="content-header">{header}</Header>
      <Line large />
      {statistics}
      <Line />
      <Content>{content}</Content>
    </StyledContentSection>
  );
};

export default ContentSection;
