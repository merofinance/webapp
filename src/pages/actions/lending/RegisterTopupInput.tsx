import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FormikFormType, FormType } from "./RegisterTopupConditions";

const StyledRegisterTopupInput = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
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
    height: 2.4rem;
    border-radius: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  background-color: #252140;
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
    font-size: 1.2rem;
    border-radius: 3px;
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
  margin-left: 1.3rem;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

type Props = {
  type: string;
  name: keyof FormType;
  formik: FormikFormType;
  placeholder: string;
};

const RegisterTopupInput = ({ type, name, formik, placeholder }: Props): JSX.Element => {
  const { t } = useTranslation();
  const valid = !formik.touched[name] || !formik.errors[name];

  return (
    <StyledRegisterTopupInput>
      <InputBorder valid={valid}>
        <Input
          valid={valid}
          type={type}
          name={name}
          value={formik.values[name]}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </InputBorder>
      {!valid && <Error>{t(formik.errors[name] || "")}</Error>}
    </StyledRegisterTopupInput>
  );
};

export default RegisterTopupInput;
