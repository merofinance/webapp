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

  width: ${(props: Props) => (props.row ? "100%" : "9rem")};
  height: ${(props: Props) => (props.row ? (props.preview ? "5.6rem" : "7.2rem") : "2.1rem")};
  border-radius: ${(props: Props) => (props.row ? "14px" : "3px")};
  margin-top: ${(props: Props) => (props.row ? "0.8rem" : "0")};
`;

interface Props {
  row?: boolean;
  preview?: boolean;
}

const Loader = ({ row, preview }: Props) => {
  return <StyledLoader row={row} preview={preview} />;
};

export default Loader;
