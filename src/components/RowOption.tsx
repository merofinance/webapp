import styled from "styled-components";
import { Optional } from "../lib/types";

import Loader from "./Loader";

interface ColumnType {
  label: string;
  value: Optional<string | JSX.Element>;
}

export interface RowOptionType {
  value: string;
  columns: ColumnType[];
  id?: string;
  disabledText?: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;

  :hover {
    > div {
      transform: scale(1);
    }
  }
`;

interface RowOptionProps {
  active: boolean;
  disabled: boolean;
}

const StyledRowOption = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  border-radius: 1.4rem;
  background-origin: border-box;
  background-clip: padding-box, border-box;

  border: ${(props: RowOptionProps) => (props.active ? "2px" : "1px")} solid transparent;
  background-image: ${(props: RowOptionProps) =>
    props.active
      ? "linear-gradient(to right, #1D0B38, #101839), var(--gradient)"
      : "linear-gradient(var(--row-bg), var(--row-bg)), linear-gradient(#2B293D, #2B293D)"};
  padding: ${(props: RowOptionProps) => (props.active ? "1.2rem 1.3rem" : "1.3rem 1.4rem")};
  cursor: ${(props: RowOptionProps) => (props.disabled ? "auto" : "pointer")};
  opacity: ${(props: RowOptionProps) => (props.disabled ? "0.4" : "1")};

  transition: filter 0.3s;
  filter: brightness(1);
  :hover {
    filter: ${(props: RowOptionProps) => (props.disabled ? "brightness(1)" : "brightness(1.25)")};
  }

  @media (max-width: 600px) {
    div:nth-child(4) {
      display: none;
    }
  }
`;

interface ColumnProps {
  hideMobile?: boolean;
}

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    display: ${(props: ColumnProps) => (props.hideMobile ? "none" : "flex")};
  }
`;

const Header = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;
  opacity: 0.6;

  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
`;

const Value = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media only percy {
    opacity: 0;
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
  active: boolean;
  select: () => void;
  option: RowOptionType;
}

const RowOption = ({ active, select, option }: Props): JSX.Element => {
  return (
    <Container>
      <StyledRowOption
        id={option.id}
        active={active}
        onClick={() => {
          if (!option.disabledText) select();
        }}
        disabled={!!option.disabledText}
      >
        {option.columns.map((column: ColumnType) => (
          <Column key={column.label}>
            {column.label && <Header>{column.label}</Header>}
            {typeof column.value === "string" ? (
              <Value>{column.value}</Value>
            ) : column.value ? (
              column.value
            ) : (
              <Loader />
            )}
          </Column>
        ))}
      </StyledRowOption>
      {option.disabledText && (
        <HoverTextContainer>
          <HoverText>{option.disabledText}</HoverText>
        </HoverTextContainer>
      )}
    </Container>
  );
};

export default RowOption;
