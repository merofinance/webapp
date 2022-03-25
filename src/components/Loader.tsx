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

  width: ${(props: Props) => (props.row || props.button ? "100%" : props.large ? "16rem" : "9rem")};
  height: ${(props: Props) =>
    props.large
      ? "3.8rem"
      : props.row
      ? props.thin
        ? "4.8rem"
        : props.preview
        ? "5.6rem"
        : "7.2rem"
      : props.button
      ? "4.6rem"
      : "2.1rem"};
  border-radius: ${(props: Props) => (props.row ? "14px" : props.button ? "15px" : "3px")};
  margin-top: ${(props: Props) => (props.row ? "0.8rem" : "0")};
`;

interface Props {
  row?: boolean;
  preview?: boolean;
  button?: boolean;
  thin?: boolean;
  large?: boolean;
}

const Loader = ({ row, preview, button, thin, large }: Props): JSX.Element => {
  return <StyledLoader row={row} preview={preview} button={button} thin={thin} large={large} />;
};

export default Loader;
