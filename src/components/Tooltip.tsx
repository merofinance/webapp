import React, { useState } from "react";
import styled from "styled-components";
import info from "../assets/ui/info.svg";

const StyledTooltip = styled.div`
  position: relative;
  margin-left: 0.9rem;
  margin-top: 2px;
`;

const Icon = styled.img`
  height: 1.2rem;
  cursor: pointer;
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

const Popup = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 1rem);
  width: 300px;
  max-width: 30rem;
  font-size: 1.1rem;
  background-color: #433b6b;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 0.6rem 0.8rem;
  z-index: 2;

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: #433b6b;
    transform: translate(-50%, -0.5rem) rotate(45deg);
  }
`;

type Props = {
  content: string;
};

const Tooltip = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledTooltip>
      <Icon src={info} onClick={() => setOpen(true)} alt="help icon" />
      {open && (
        <>
          <ExitEvent onClick={() => setOpen(false)} />
          <Popup>{props.content}</Popup>
        </>
      )}
    </StyledTooltip>
  );
};

export default Tooltip;
