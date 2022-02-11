import { useState } from "react";
import styled from "styled-components";
import arrow from "../assets/ui/accordion-chevron.svg";

export interface DropdownOptionType {
  label: string;
  action: () => void;
}

const StyledDropdown = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Label = styled.div`
  text-transform: capitalize;
  font-size: 1.6rem;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.15px;
  margin-right: 0.7rem;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const ArrowContainer = styled.div`
  margin-top: 0rem;
`;

interface ArrowProps {
  open: boolean;
}

const Arrow = styled.img`
  width: 0.8rem;
  transform: ${(props: ArrowProps) => (props.open ? "rotate(0deg)" : "rotate(180deg)")};
  transition: 0.3s transform;
`;

const ExitEvent = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 200vw;
  height: 200vh;
  transform: translate(-50%, -50%);
`;

const Options = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  left: 50%;
  transform: translateX(-50%);
  padding: 1.7rem 0;
  background: #423b68;
  box-shadow: 0px 0px 12px 0px #00000066;
  border: 1px solid #554d82;
  border-radius: 14px;
`;

const Option = styled.button`
  padding: 0 1.4rem;
  height: 3.6rem;
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.15px;
  width: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;

  background: #423b68;
  transition: all 0.3s;
  :hover {
    background: #322b58;
  }
`;

interface Props {
  label: string;
  options: DropdownOptionType[];
}

const Dropdown = ({ label, options }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <StyledDropdown>
      <DropdownButton onClick={() => setOpen(true)}>
        <Label>{label}</Label>
        <ArrowContainer>
          <Arrow open={open} src={arrow} alt="Dropdown chevron" />
        </ArrowContainer>
      </DropdownButton>
      {open && (
        <>
          <ExitEvent onClick={() => setOpen(false)} />
          <Options>
            {options.map((option: DropdownOptionType) => (
              <Option
                key={option.label}
                onClick={() => {
                  option.action();
                  setOpen(false);
                }}
              >
                {option.label}
              </Option>
            ))}
          </Options>
        </>
      )}
    </StyledDropdown>
  );
};

export default Dropdown;
