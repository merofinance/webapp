import styled from "styled-components";
import { Optional } from "../lib/types";
import HoverFeedback from "./HoverFeedback";

import Loader from "./Loader";

interface ColumnType {
  label: string;
  value: Optional<string | JSX.Element>;
  large?: boolean;
}

export interface RowOptionType {
  value: string;
  columns: ColumnType[];
  id?: string;
  disabledText?: string;
}

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
  large?: boolean;
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: ${(props: ColumnProps) => (props.large ? "2" : "1")};

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
  text-align: left;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

interface Props {
  active: boolean;
  select: () => void;
  option: RowOptionType;
}

const RowOption = ({ active, select, option }: Props): JSX.Element => {
  const getColumnValue = (value: Optional<string | JSX.Element>): JSX.Element => {
    if (typeof value === "string") return <Value>{value}</Value>;
    if (value) return value;
    return <Loader />;
  };

  return (
    <HoverFeedback text={option.disabledText}>
      <StyledRowOption
        id={option.id}
        active={active}
        onClick={() => {
          if (!option.disabledText) select();
        }}
        disabled={!!option.disabledText}
      >
        {option.columns.map((column: ColumnType) => (
          <Column key={column.label} large={column.large}>
            {column.label && <Header>{column.label}</Header>}
            {getColumnValue(column.value)}
          </Column>
        ))}
      </StyledRowOption>
    </HoverFeedback>
  );
};

export default RowOption;
