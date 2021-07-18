import React, { useState } from "react";
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

const Option = styled.button`
  position: relative;
  width: 18rem;
  padding: 1.6rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const OptionText = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: 0.46px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.54);
`;

interface OptionTextProps {
  active: boolean;
}

const GradientOptionText = styled(GradientText)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: 0.46px;
  text-transform: uppercase;

  transition: opacity 0.3s;
  opacity: ${(props: OptionTextProps) => (props.active ? "1" : "0")};
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
  left: 0;
  width: 18rem;
  height: 2px;
  background: var(--gradient);

  transition: transform 0.3s;
  transform: translateX(${(props: ActiveLineProps) => `${props.activeIndex * 18}rem`});
`;

const Content = styled.div`
  width: 100%;
  padding: 2.4rem 1.6rem;
`;

interface Props {
  tabs: TabType[];
}

const Tabs = ({ tabs }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <StyledTabs>
      <Options>
        {tabs.map((tab: TabType, index: number) => (
          <Option onClick={() => setActiveIndex(index)}>
            <OptionText>{tab.label}</OptionText>
            <GradientOptionText active={activeIndex === index}>{tab.label}</GradientOptionText>
          </Option>
        ))}
      </Options>
      <LineContainer>
        <ActiveLine activeIndex={activeIndex} />
      </LineContainer>
      <Content>{tabs[activeIndex].content}</Content>
    </StyledTabs>
  );
};

export default Tabs;
