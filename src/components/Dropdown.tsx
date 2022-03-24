import { useEffect, useRef, useState } from "react";
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

interface ExitEventProps {
  open: boolean;
}

const ExitEvent = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 99vw;
  height: 99vh;
  display: ${(props: ExitEventProps) => (props.open ? "flex" : "none")};
`;

interface OptionsProps {
  show: boolean;
}

const OptionsContainer = styled.div`
  opacity: ${(props: OptionsProps) => (props.show ? "1" : "0")};
  transform: ${(props: OptionsProps) => (props.show ? "scale(1)" : "scale(0)")};
  transition: 0.3s all;
`;

const Options = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  left: 50%;
  transform: translateX(-50%);
  padding: 1.3rem 0;
  background: #423b68;
  box-shadow: 0px 0px 12px 0px #00000066;
  border: 1px solid #554d82;
  border-radius: 14px;
  min-width: 18rem;
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
  cursor: pointer;

  background: #423b68;
  transition: all 0.3s;
  :hover {
    background: #322b58;
  }
`;

interface Props {
  id?: string;
  label: string;
  options: DropdownOptionType[];
}

const Dropdown = ({ id, label, options }: Props): JSX.Element => {
  const exitRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [translation, setTranslation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!exitRef || !exitRef.current || translation.x !== 0) return;
    setTranslation({
      x: exitRef.current.getBoundingClientRect().x,
      y: exitRef.current.getBoundingClientRect().y,
    });

    return () => {
      setTranslation({ x: 0, y: 0 });
    };
  }, [open]);

  return (
    <StyledDropdown>
      <DropdownButton id={`${id}-dropdown-button`} onClick={() => setOpen(true)}>
        <Label id={`${id}-dropdown-label`}>{label}</Label>
        <ArrowContainer>
          <Arrow open={open} src={arrow} alt="Dropdown chevron" />
        </ArrowContainer>
      </DropdownButton>
      <ExitEvent
        open={open}
        ref={exitRef}
        id={`${id}-dropdown-exit-event`}
        onClick={() => setOpen(false)}
        style={{ transform: `translate(-${translation.x}px, -${translation.y}px)` }}
      />
      <OptionsContainer show={open}>
        <Options id={`${id}-dropdown-options`}>
          {options.map((option: DropdownOptionType) => (
            <Option
              id={`${id}-dropdown-${option.label}-option`}
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
      </OptionsContainer>
    </StyledDropdown>
  );
};

export default Dropdown;
