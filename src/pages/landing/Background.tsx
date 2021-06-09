import React from "react";
import styled from "styled-components";
import ovals from "../../assets/background/ovals.svg";

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
`;

const Background = () => {
  return (
    <StyledBackground>
      <Ovals src={ovals} />
    </StyledBackground>
  );
};

export default Background;
