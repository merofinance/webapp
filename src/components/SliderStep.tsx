import React from "react";
import styled from "styled-components";

type StepProps = {
  percent: string;
  active: boolean;
};

const Step = styled.button`
  position: absolute;
  bottom: 1.4rem;
  left: ${(props: StepProps) => props.percent};
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${(props: StepProps) =>
    props.active ? "linear-gradient(to right, #80499F, #517497)" : "#57536f"};
  border: 2px solid #10092e;
  cursor: pointer;
`;

type Props = {
  percent: string;
  active: boolean;
  click: () => void;
};

const SliderStep = (props: Props) => {
  return <Step percent={props.percent} onClick={() => props.click()} active={props.active} />;
};

export default SliderStep;
