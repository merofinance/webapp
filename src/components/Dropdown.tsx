import React, { useState } from "react";
import styled from "styled-components";
import arrow from "../assets/ui/arrow.svg";

const StyledDropdown = styled.div`
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Label = styled.div`
  font-weight: 400;
  letter-spacing: 0.15px;
  margin-right: 1rem;
  text-transform: capitalize;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

type ArrowProps = {
  open: boolean;
};

const Arrow = styled.img`
  transform: ${(props: ArrowProps) => (props.open ? "rotate(0deg)" : "rotate(180deg)")};

  width: 1rem;
  @media (max-width: 600px) {
    width: 0.8rem;
  }
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
  z-index: 1;

  padding: 0.8rem 0;
  @media (max-width: 600px) {
    padding: 0.6rem 0;
  }
`;

const Option = styled.button`
  width: 100%;
  font-weight: 400;
  letter-spacing: 0.15px;
  transition: all 0.1s;
  text-align: left;
  text-transform: capitalize;
  line-height: 24px;
  cursor: pointer;

  font-size: 1.6rem;
  padding: 0.6rem 2.4rem 0.6rem 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 0.4rem 1.3rem 0.4rem 1.1rem;
  }

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
        <Arrow src={arrow} open={popupOpen} alt="arrow" />
      </Button>
      {popupOpen && (
        <>
          <ExitEvent onClick={() => setPopupOpen(false)} />
          <Popup>
            {props.options.map((option: string) => (
              <Option
                key={option}
                onClick={() => {
                  props.setValue(option);
                  setPopupOpen(false);
                }}
              >
                {option}
              </Option>
            ))}
          </Popup>
        </>
      )}
    </StyledDropdown>
  );
};

export default Dropdown;
