import React from "react";
import styled from "styled-components";

export interface ColumnType {
  label: string;
  value: string;
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
      : "linear-gradient(rgba(20, 17, 40, 1), rgba(20, 17, 40, 1)), linear-gradient(#494758, #494758)"};

  border-radius: 1.4rem;
  padding: ${(props: RowOptionProps) => (props.active ? "1.2rem 1.3rem" : "1.3rem 1.4rem")};
  margin-top: 1rem;
  cursor: pointer;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  opacity: 0.6;
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

interface Props {
  columns: ColumnType[];
  active: boolean;
  select: () => void;
}

const RowOption = ({ columns, active, select }: Props) => {
  return (
    <StyledRowOption active={active} onClick={() => select()}>
      {columns.map((column: ColumnType) => (
        <Column>
          <Header>{column.label}</Header>
          <Value>{column.value}</Value>
        </Column>
      ))}
    </StyledRowOption>
  );
};

export default RowOption;
