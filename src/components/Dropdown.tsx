import React, { useState } from "react";
import styled from "styled-components";
import arrow from "../assets/ui/arrow.svg";

const StyledDropdown = styled.div`
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  letter-spacing: 0.15px;
  margin-right: 1rem;
`;

type ArrowProps = {
  open: boolean;
};

const Arrow = styled.img`
  width: 10px;
  transition: all 0.3s;
  transform: ${(props: ArrowProps) => (props.open ? "transform(0deg)" : "transform(180deg)")};
`;

const ExitEvent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Popup = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  background-color: #433b6b;
  border-radius: 4px;
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
`;

const Option = styled.button`
  width: 100%;
  padding: 1.6rem 0.6rem 2.4rem 0.6rem;
  font-weight: 400;
  font-size: 1.6rem;
  letter-spacing: 0.15px;
  transition: all 0.1s;

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

type Props = {
  value: string;
  options: string[];
  setValue: (v: string) => void;
};

const Dropdown = (props: Props) => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <StyledDropdown>
      <Button onClick={() => setPopupOpen(true)}>
        <Label>{props.value ? props.value : "Choose"}</Label>
        <Arrow src={arrow} open={popupOpen} />
      </Button>
      {popupOpen && (
        <>
          <ExitEvent onClick={() => setPopupOpen(false)} />
          <Popup>
            {props.options.map((option: string) => (
              <Option>{option}</Option>
            ))}
          </Popup>
        </>
      )}
    </StyledDropdown>
  );
};

export default Dropdown;
