import React from "react";
import styled from "styled-components";
import ovals from "../../assets/background/ovals.svg";
import icons from "../../assets/background/icons.svg";
import darkIcons from "../../assets/background/dark-icons.svg";

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  overflow: hidden;
`;

const Ovals = styled.img`
  position: absolute;
  top: 2.4rem;
  left: 0;
  width: 100%;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Icons = styled.img`
  position: absolute;
  top: 19rem;
  left: -2%;
  width: 104%;

  @media (max-width: 600px) {
    width: 140%;
    left: -20%;
    top: 10rem;
  }
`;

const DarkIcons = styled.img`
  position: absolute;
  top: 175rem;
  left: 0;
  width: 100%;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Background = (): JSX.Element => {
  return (
    <StyledBackground>
      <Ovals src={ovals} alt="decorative ovals" />
      <Icons src={icons} alt="decorative icons" />
      <DarkIcons src={darkIcons} alt="decorative dark icons" />
    </StyledBackground>
  );
};

export default Background;
