import React from "react";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
	from {
  	background-position: right center;
	}
	to {
  	background-position: left center;
	}
`;

const StyledLoader = styled.div`
  width: 9rem;
  height: 2rem;
  border-radius: 3px;
  background-size: 400% auto;
  background-position: right center;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.1) 30%,
    rgba(255, 255, 255, 0.2) 38%,
    rgba(255, 255, 255, 0.1) 46%,
    rgba(255, 255, 255, 0.1) 100%
  );
  animation: ${animation} 2s infinite;
`;

const Loader = () => {
  return <StyledLoader />;
};

export default Loader;
