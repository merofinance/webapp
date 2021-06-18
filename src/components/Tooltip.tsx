import React, { useState } from "react";
import styled from "styled-components";
import info from "../assets/ui/info.svg";

const StyledTooltip = styled.div`
  position: relative;
  margin-left: 0.9rem;
  z-index: 2;
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
  background-color: rgba(5, 1, 32, 0.5);
`;

const Popup = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 40px;
  background-color: green;
`;

type Props = {
  content: string;
};

const Tooltip = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledTooltip>
      <Icon src={info} onClick={() => setOpen(true)} />
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
