import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ovals from "../../assets/background/ovals.svg";
import icons from "../../assets/background/icons.svg";
import darkIcons from "../../assets/background/dark-icons.svg";

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

type ScrollProps = {
  transform: string;
};

const Ovals = styled.img.attrs((props: ScrollProps) => ({
  style: {
    transform: props.transform,
  },
}))`
  position: absolute;
  top: ${(props: ScrollProps) => (props.transform ? 0 : 0)};
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.1s ease-out;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Icons = styled.img.attrs((props: ScrollProps) => ({
  style: {
    transform: props.transform,
  },
}))`
  position: absolute;
  top: ${(props: ScrollProps) => (props.transform ? "14rem" : "14rem")};
  left: 0;
  width: 100%;
  transition: transform 0.1s ease-out;

  @media (max-width: 600px) {
    width: 130%;
    left: -15%;
    top: 5rem;
  }
`;

const DarkIcons = styled.img.attrs((props: ScrollProps) => ({
  style: {
    transform: props.transform,
  },
}))`
  position: absolute;
  top: ${(props: ScrollProps) => (props.transform ? "100rem" : "100rem")};
  left: 0;
  width: 100%;
  transition: transform 0.1s ease-out;

  @media (max-width: 600px) {
    display: none;
  }
`;

const Background = (): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledBackground>
      <Ovals
        src={ovals}
        transform={`translateY(${-scrollPosition / 4}px)`}
        alt="decorative ovals"
      />
      <Icons
        src={icons}
        transform={`translateY(${-scrollPosition / 2}px)`}
        alt="decorative icons"
      />
      <DarkIcons
        src={darkIcons}
        transform={`translateY(${-scrollPosition / 2}px)`}
        alt="decorative dark icons"
      />
    </StyledBackground>
  );
};

export default Background;
