import React from "react";
import styled from "styled-components";
import ovals from "../../assets/background/ovals.svg";
import icons from "../../assets/background/icons.svg";
import darkIcons from "../../assets/background/dark-icons.svg";
import useWindowPosition from "../../app/hooks/use-window-position";

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Ovals = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.1s ease-out;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Icons = styled.img`
  position: absolute;
  top: 14rem;
  left: -8%;
  width: 116%;
  transition: transform 0.1s ease-out;

  @media (max-width: 600px) {
    width: 130%;
    left: -15%;
    top: 5rem;
  }
`;

const DarkIcons = styled.img`
  position: absolute;
  top: 100rem;
  left: 0;
  width: 100%;
  transition: transform 0.1s ease-out;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Background = (): JSX.Element => {
  const windowPosition = useWindowPosition();

  return (
    <StyledBackground>
      <Ovals
        src={ovals}
        style={{ transform: `translateY(${-windowPosition / 4}px)` }}
        alt="decorative ovals"
      />
      <Icons
        src={icons}
        style={{ transform: `translateY(${-windowPosition / 2}px)` }}
        alt="decorative icons"
      />
      <DarkIcons
        src={darkIcons}
        style={{ transform: `translateY(${-windowPosition / 2}px)` }}
        alt="decorative dark icons"
      />
    </StyledBackground>
  );
};

export default Background;
