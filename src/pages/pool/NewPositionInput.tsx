import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FormikFormType, FormType, Value } from "./NewPosition";

const StyledNewPositionInput = styled.div`
  width: 67%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type InputBorderProps = {
  valid: boolean;
};

const InputBorder = styled.div`
  position: relative;
  width: 100%;
  padding: 1px;

  background: ${(props: InputBorderProps) =>
    props.valid
      ? "linear-gradient(to right, #c532f9, #32b2e5)"
      : "linear-gradient(to right, var(--error), var(--error))"};

  height: 3.2rem;
  border-radius: 7px;
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

  font-size: 1.2rem;
  border-radius: 6px;
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
  position: absolute;
  left: 50%;
  top: calc(100% + 0.6rem);
  transform: translateX(-50%);
  background-color: var(--error);
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
`;

type Props = {
  type: string;
  name: keyof FormType;
  formik: FormikFormType;
};

const NewPositionInput = ({ type, name, formik }: Props): JSX.Element => {
  const { t } = useTranslation();
  const valid = !formik.touched[name] || !formik.errors[name];

  return (
    <Value>
      <StyledNewPositionInput>
        <InputBorder valid={valid}>
          <Input
            type={type}
            name={name}
            value={formik.values[name]}
            placeholder="0"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {!valid && <Error>{t(formik.errors[name] || "")}</Error>}
        </InputBorder>
      </StyledNewPositionInput>
    </Value>
  );
};

export default NewPositionInput;
