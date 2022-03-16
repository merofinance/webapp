import { ReactNode } from "react";
import styled from "styled-components";

const StyledHoverFeedback = styled.div`
  position: relative;

  :hover {
    > div:last-child {
      transform: scale(1);
    }
  }
`;

const HoverTextContainer = styled.div`
  position: absolute;
  left: 0;
  top: calc(100% + 0.6rem);
  width: 100%;
  transition: transform 0.2s;
  transform: scale(0) translateY(-1rem);
  z-index: 1;
`;

const HoverText = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  transform: translateX(-50%);
  background-color: #433b6b;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
`;

interface Props {
  children: ReactNode;
  text?: string;
}

const HoverFeedback = ({ children, text }: Props): JSX.Element => {
  return (
    <StyledHoverFeedback>
      {children}
      {text && (
        <HoverTextContainer>
          <HoverText>{text}</HoverText>
        </HoverTextContainer>
      )}
    </StyledHoverFeedback>
  );
};

export default HoverFeedback;
