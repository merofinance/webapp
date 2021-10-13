import React from "react";
import styled from "styled-components";

export interface ColumnType {
  label: string;
  value: string | JSX.Element;
}

interface RowOptionProps {
  active: boolean;
}

const StyledRowOption = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: ${(props: RowOptionProps) => (props.active ? "2px" : "1px")} solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-image: ${(props: RowOptionProps) =>
    props.active
      ? "linear-gradient(to right, #1D0B38, #101839), var(--gradient)"
      : "linear-gradient(rgba(20, 17, 40, 1), rgba(20, 17, 40, 1)), linear-gradient(#2B293D, #2B293D)"};

  border-radius: 1.4rem;
  padding: ${(props: RowOptionProps) => (props.active ? "1.2rem 1.3rem" : "1.3rem 1.4rem")};
  margin-top: 1rem;
  cursor: pointer;

  transition: filter 0.3s;
  filter: brightness(1);
  :hover {
    filter: brightness(1.25);
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
`;

interface Props {
  columns: ColumnType[];
  active: boolean;
  select: () => void;
  id?: string;
}

const RowOption = ({ columns, active, select, id }: Props) => {
  return (
    <StyledRowOption id={id} active={active} onClick={() => select()}>
      {columns.map((column: ColumnType) => (
        <Column key={column.label}>
          <Header>{column.label}</Header>
          {typeof column.value === "string" ? <Value>{column.value}</Value> : column.value}
        </Column>
      ))}
    </StyledRowOption>
  );
};

export default RowOption;
