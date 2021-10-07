import React from "react";
import styled from "styled-components";

const StyledContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 1.4rem;
  background-color: rgba(21, 14, 59, 0.5);
`;

const HeaderContainer = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(252, 40, 211, 0.05);
  box-shadow: 0px 0px 12px rgba(23, 18, 22, 0.05);
  border-top-right-radius: 1.4rem;
  border-top-left-radius: 1.4rem;

  padding: 2rem 2.4rem;
  @media (max-width: 600px) {
    padding: 1.6rem;
  }
`;

const HeaderTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled.h2`
  font-weight: 600;
  letter-spacing: 0.25px;

  font-size: 2.4rem;
  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const SubHeader = styled(Header)`
  margin-left: 1.3rem;
  opacity: 0.6;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Key = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: 0.25px;
`;

interface LineProps {
  large?: boolean;
}

const Line = styled.div`
  width: 100%;
  height: ${(props: LineProps) => (props.large ? "5px" : "2px")};
  background: var(--gradient);
  opacity: 0.2;
`;

interface ContentProps {
  noContentPadding?: boolean;
}

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${(props: ContentProps) => (props.noContentPadding ? "0" : "2.4rem 2.4rem")};

  @media (max-width: 600px) {
    padding: ${(props: ContentProps) => (props.noContentPadding ? "0" : "1.6rem")};
  }
`;

interface Props {
  header: string;
  subHeader?: string;
  statistics?: JSX.Element;
  content: JSX.Element;
  nav?: string;
  noContentPadding?: boolean;
}

const ContentSection = ({
  header,
  subHeader,
  statistics,
  content,
  nav,
  noContentPadding,
}: Props): JSX.Element => {
  return (
    <StyledContentSection>
      <HeaderContainer>
        <HeaderTextContainer>
          <Header>{header}</Header>
          {subHeader && <SubHeader>{subHeader}</SubHeader>}
        </HeaderTextContainer>
        {nav && <Key>{nav}</Key>}
      </HeaderContainer>
      <Line large />
      {statistics && statistics}
      {statistics && <Line />}
      <Content noContentPadding={noContentPadding}>{content}</Content>
    </StyledContentSection>
  );
};

export default ContentSection;
