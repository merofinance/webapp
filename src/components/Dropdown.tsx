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
    </StyledDropdown>
  );
};

export default Dropdown;
