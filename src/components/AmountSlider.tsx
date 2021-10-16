import { Slider, withStyles } from "@material-ui/core";
import { BigNumber } from "ethers";
import React from "react";
import styled from "styled-components";
import { ScaledNumber } from "../lib/scaled-number";
import SliderStep from "./SliderStep";

const Gradient = "linear-gradient(to right, rgba(197, 50, 249, 1), rgba(50, 178, 229, 1))";
const GradientLight =
  "linear-gradient(to right, rgba(197, 50, 249, 0.38), rgba(50, 178, 229, 0.38))";
const steps: number[] = [25, 50, 75, 100];

const StyledAmountSlider = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.7rem;
  margin-top: 1.8rem;
`;

const BackdSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 18,
    width: 18,
    marginTop: -7,
    marginLeft: -9,
    borderRadius: 9,
    background: Gradient,
    zIndex: 1,
  },
  track: {
    height: 3,
    borderRadius: 2,
    background: GradientLight,
  },
  valueLabel: {
    left: -8,
    "& span": {
      background: "#433b6b",
      fontSize: 11,
    },
    "& span > span": {
      background: "transparent",
    },
  },
  rail: {
    height: 3,
    borderRadius: 2,
    background: "#C4C4C4",
  },
  mark: {
    display: "none",
  },
})(Slider);

const valuetext = (value: any) => `${value}%`;

type Props = {
  value: string;
  max: ScaledNumber;
  setValue: (value: string) => void;
};

const AmountSlider = ({ value, max, setValue }: Props): JSX.Element => {
  const percent = max.isZero() ? 0 : Math.round((Number(value) / Number(max.toString())) * 100);

  const updateValue = (percent: number) => {
    const newValue = max.value.mul(BigNumber.from(percent)).div(BigNumber.from(100));
    const scaled = new ScaledNumber(newValue, max.decimals);
    setValue(percent === 100 ? scaled.toString() : scaled.toCryptoString({ useGrouping: false }));
  };

  return (
    <StyledAmountSlider>
      <BackdSlider
        marks
        defaultValue={0}
        step={25}
        min={0}
        max={100}
        value={percent}
        onChange={(e: any, value: any) => updateValue(value)}
        valueLabelDisplay="auto"
        valueLabelFormat={valuetext}
      />
      {steps.map((step: number) => (
        <SliderStep
          id={`slider-${step}`}
          key={step}
          percent={`${step}%`}
          click={() => updateValue(step)}
          active={Number(value || 0) / Number(max.toString()) > step / 100}
        />
      ))}
    </StyledAmountSlider>
  );
};

export default AmountSlider;
