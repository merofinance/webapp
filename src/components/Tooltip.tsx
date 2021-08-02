import React, { useRef, useState } from "react";
import styled from "styled-components";
import info from "../assets/ui/info.svg";

const StyledTooltip = styled.div`
  position: relative;

  margin-top: 2px;
  margin-left: 0.9rem;
  @media (max-width: 600px) {
    margin-top: 2.2px;
    margin-left: 0.6rem;
  }
`;

const Icon = styled.img`
  cursor: pointer;

  height: 1.2rem;
  @media (max-width: 600px) {
    height: 1rem;
  }
`;

const ExitEvent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(5, 1, 32, 0);
  z-index: 1;
`;

const Arrow = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: #433b6b;
  transform: translate(-50%, 0.3rem) rotate(45deg);
`;

interface PopupProps {
  tooltipTop: number;
  tooltipLeft: number;
}

const Popup = styled.div`
  position: fixed;
  top: ${(props: PopupProps) => props.tooltipTop + "px"};
  left: ${(props: PopupProps) =>
    Math.min(Math.max(props.tooltipLeft, 160), window.innerWidth - 160) + "px"};
  transform: translate(-50%, 2rem);
  width: 300px;
  max-width: 30rem;
  font-size: 1.1rem;
  background-color: #433b6b;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 0.6rem 0.8rem;
  z-index: 2;
`;

type Props = {
  content: string;
};

const Tooltip = (props: Props) => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <StyledTooltip ref={tooltipRef}>
      <Icon src={info} onClick={() => setOpen(true)} alt="help icon" />
      {open && (
        <>
          <ExitEvent onClick={() => setOpen(false)} />
          <Arrow />
          <Popup
            tooltipTop={tooltipRef.current!.getBoundingClientRect().top | 0}
            tooltipLeft={tooltipRef.current!.getBoundingClientRect().left | 0}
          >
            {props.content}
          </Popup>
        </>
      )}
    </StyledTooltip>
  );
};

export default Tooltip;
