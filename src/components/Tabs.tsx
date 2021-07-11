import React from "react";
import styled from "styled-components";
import GradientText from "../styles/GradientText";

export interface TabType {
  label: string;
  content: JSX.Element;
}

const StyledTabs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Options = styled.div`
  width: 100%;
  display: flex;
  background-color: rgba(10, 6, 33, 0.45);
`;

const Option = styled.div`
  width: 18rem;
  padding: 1.6rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface OptionTextProps {
  active: boolean;
}

const OptionText = styled(GradientText)`
  color: ${(props: OptionTextProps) => (props.active ? "auto" : "rgba(255, 255, 255, 0.54)")};
`;

const LineContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, rgba(197, 50, 249, 0.2), rgba(50, 178, 229, 0.2));
`;

interface ActiveLineProps {
  activeIndex: number;
}

const ActiveLine = styled.div`
  position: absolute;
  top: 0;
  width: 18rem;
  height: 2px;
  left: ${(props: ActiveLineProps) => `${props.activeIndex * 18}rem`};
  background: var(--gradient);
`;

const Content = styled.div`
  width: 100%;
  padding-top: 3.4rem;
`;

interface Props {
  tabs: TabType[];
}

const Tabs = ({ tabs }: Props) => {
  return (
    <StyledTabs>
      <Options>
        {tabs.map((tab: TabType, index: number) => (
          <Option>
            <OptionText active={index === 0}>{tab.label}</OptionText>
          </Option>
        ))}
      </Options>
      <LineContainer>
        <ActiveLine activeIndex={0} />
      </LineContainer>
      <Content>{tabs[0].content}</Content>
    </StyledTabs>
  );
};

export default Tabs;
