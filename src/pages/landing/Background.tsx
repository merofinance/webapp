import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ovals from "../../assets/background/ovals.svg";
import icons from "../../assets/background/icons.svg";

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

type ScrollProps = {
  scroll: number;
};

const Ovals = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.3s 0s ease-out;
  transform: ${(props: ScrollProps) => `translateY(${-props.scroll / 4}px)`};
`;

const Icons = styled.img`
  position: absolute;
  top: 14rem;
  left: 0;
  width: 100%;
  transition: transform 0.3s 0s ease-out;
  transform: ${(props: ScrollProps) => `translateY(${-props.scroll / 2}px)`};
`;

const Background = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    console.log(window.pageYOffset);
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
      <Ovals src={ovals} scroll={scrollPosition} />
      <Icons src={icons} scroll={scrollPosition} />
    </StyledBackground>
  );
};

export default Background;
