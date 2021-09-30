import React from "react";
import styled from "styled-components";
import RowOption, { ColumnType } from "./RowOption";

export interface RowOptionType {
  value: string;
  columns: ColumnType[];
}

const StyledRowSelector = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  options: RowOptionType[];
  value: string;
  setValue: (value: string) => void;
}

const RowSelector = ({ options, value, setValue }: Props) => {
  return (
    <StyledRowSelector>
      {options.map((option: RowOptionType) => (
        <RowOption
          columns={option.columns}
          active={option.value === value}
          select={() => setValue(option.value)}
        />
      ))}
    </StyledRowSelector>
  );
};

export default RowSelector;
