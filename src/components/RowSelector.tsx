import styled from "styled-components";
import RowOption, { RowOptionType } from "./RowOption";

const StyledRowSelector = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 3rem;
  @media (max-width: 600px) {
    margin-top: 2rem;
  }
`;

interface Props {
  options: RowOptionType[];
  value: string;
  setValue: (value: string) => void;
}

const RowSelector = ({ options, value, setValue }: Props): JSX.Element => {
  return (
    <StyledRowSelector>
      {options.map((option: RowOptionType) => (
        <RowOption
          key={option.value}
          active={option.value === value}
          select={() => setValue(option.value)}
          option={option}
        />
      ))}
    </StyledRowSelector>
  );
};

export default RowSelector;
