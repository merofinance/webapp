import { Slider, withStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Gradient = "linear-gradient(to right, rgba(197, 50, 249, 1), rgba(50, 178, 229, 1))";

const BackdSlider = withStyles({
  thumb: {
    height: 16,
    width: 16,
    marginTop: -7,
    marginLeft: -7,
    borderRadius: 6,
    background: Gradient,
  },
  track: {
    height: 3,
    borderRadius: 2,
    background: Gradient,
  },
  rail: {
    height: 3,
    borderRadius: 2,
    background: Gradient,
  },
  mark: {
    backgroundColor: "var(--main)",
    height: 3,
    width: 1,
    marginTop: 0,
    opacity: 0.4,
  },
})(Slider);

type Props = {
  value: string;
  max: number;
  setValue: (value: string) => void;
};

const AmountSlider = (props: Props) => {
  const percent = (Number(props.value) / props.max) * 100;

  return (
    <BackdSlider
      marks
      defaultValue={0}
      step={10}
      min={0}
      max={100}
      value={percent}
      onChange={(e: any, value: any) => props.setValue(((value * props.max) / 100).toString())}
    />
  );
};

export default AmountSlider;
