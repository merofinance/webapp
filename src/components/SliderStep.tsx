import styled from "styled-components";

interface StepProps {
  percent: string;
  active: boolean;
}

const Step = styled.button`
  position: absolute;
  left: ${(props: StepProps) => props.percent};
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${(props: StepProps) =>
    props.active ? "linear-gradient(to right, #80499F, #517497)" : "#57536f"};
  border: 2px solid #10092e;
  cursor: pointer;

  transition: all 0.2s;

  bottom: 1.4rem;
  @media (max-width: 600px) {
    bottom: 2.1rem;
  }

  :hover {
    width: 20px;
    height: 20px;
    bottom: 1.1rem;
    @media (max-width: 600px) {
      bottom: 1.8rem;
    }

    > div {
      transform: scale(1) translateY(-10px);
    }
  }
`;

const PercentContainer = styled.div`
  position: absolute;
  left: -8px;
  width: 32px;
  height: 32px;
  top: -34px;

  transition: transform 0.2s;
  transform-origin: bottom;
  transform: scale(0) translateY(-20px);
`;

const PercentBackground = styled.div`
  background: #433b6b;
  width: 32px;
  height: 32px;
  display: flex;
  transform: rotate(-45deg);
  align-items: center;
  border-radius: 50% 50% 50% 0;
  justify-content: center;
`;

const PercentText = styled.div`
  font-size: 1.1rem;
  transform: rotate(45deg);
`;

interface Props {
  percent: string;
  active: boolean;
  click: () => void;
  id: string;
}

const SliderStep = ({ id, percent, active, click }: Props): JSX.Element => {
  return (
    <Step id={id} percent={percent} onClick={() => click()} active={active}>
      <PercentContainer>
        <PercentBackground>
          <PercentText>{percent}</PercentText>
        </PercentBackground>
      </PercentContainer>
    </Step>
  );
};

export default SliderStep;
