import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FormikFormType, FormType } from "./RegisterTopupConditionsForm";
import Tooltip from "../../../../components/Tooltip";

const StyledRegisterTopupInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 1.5rem;
  margin-top: 4rem;
  @media (max-width: 600px) {
    margin-bottom: 1rem;
    margin-top: 2.5rem;
  }
`;

const Label = styled.div`
  font-weight: 700;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 60%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

interface InputProps {
  valid: boolean;
}

const InputBorder = styled.div`
  position: relative;
  width: 100%;
  padding: 1px;

  background: ${(props: InputProps) =>
    props.valid
      ? "linear-gradient(to right, #c532f9, #32b2e5)"
      : "linear-gradient(to right, var(--error), var(--error))"};

  height: 4.5rem;
  border-radius: 14px;
  @media (max-width: 600px) {
    height: 3.4rem;
    border-radius: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  background-color: var(--bg-light);
  height: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.15px;
  font-weight: 400;

  color: ${(props: InputProps) => (props.valid ? "var(--main)" : "var(--error)")};

  font-size: 1.6rem;
  border-radius: 13px;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    border-radius: 9px;
  }

  -moz-appearance: textfield;
  ::-webkit-outer-spin-button {
    display: none;
  }
  ::-webkit-inner-spin-button {
    display: none;
  }

  ::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Error = styled.div`
  font-weight: 500;
  color: var(--error);
  margin-top: 0.6rem;

  font-size: 1.6rem;
  margin-left: 1.3rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-left: 0.9rem;
  }
`;

interface Props {
  label: string;
  tooltip: string;
  type: string;
  name: keyof FormType;
  formik: FormikFormType;
  placeholder: string;
  onBlur?: () => void;
}

const TopupInput = ({
  label,
  tooltip,
  type,
  name,
  formik,
  placeholder,
  onBlur,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const valid = !formik.touched[name] || !formik.errors[name];

  return (
    <StyledRegisterTopupInput>
      <LabelContainer>
        <Label>{label}</Label>
        <Tooltip content={tooltip} />
      </LabelContainer>
      <InputContainer>
        <InputBorder valid={valid}>
          <Input
            id={`register-topup-${name.toLowerCase()}-input`}
            valid={valid}
            type={type}
            name={name}
            value={formik.values[name]}
            placeholder={placeholder}
            onChange={formik.handleChange}
            onBlur={(e) => {
              if (onBlur) onBlur();
              formik.handleBlur(e);
            }}
          />
        </InputBorder>
        {!valid && (
          <Error id={`register-topup-${name.toLowerCase()}-error`}>
            {t(formik.errors[name] || "")}
          </Error>
        )}
      </InputContainer>
    </StyledRegisterTopupInput>
  );
};

export default TopupInput;
