import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

const StyledEmailSignup = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 12rem;
  }
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 1.7rem;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
`;

type InputProps = {
  valid: boolean;
};

const Input = styled.input`
  border: ${(props: InputProps) =>
    props.valid ? "solid 1px var(--main)" : "solid 1px var(--error)"};
  width: 26rem;
  height: 5.6rem;
  background-color: var(--bg);
  border-radius: 1.4rem;
  padding: 0 1.2rem;
  font-size: 1.6rem;
  font-weight: 400;

  ::placeholder {
    color: var(--main);
  }

  @media (max-width: 600px) {
    width: auto;
    flex: 1;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    270deg,
    var(--primary-gradient) 0%,
    var(--secondary-gradient) 50%,
    var(--primary-gradient) 100%
  );
  text-transform: capitalize;
  cursor: pointer;
  transition: 0.5s;
  background-size: 200% auto;
  // space

  width: 11.3rem;
  height: 5.6rem;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1.4rem;
  margin-left: 1.6rem;

  @media (max-width: 600px) {
    width: 8.8rem;
    height: 5.6rem;
    margin-left: 0.8rem;
  }
`;

const Note = styled.div`
  font-weight: 400;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [validate, setValidate] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const _valid = email ? re.test(String(email).toLowerCase()) : true;
    setValid(_valid);
    return _valid;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (validate) setValid(validateEmail(e.target.value));
    setEmail(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidate(true);
    const _valid = validateEmail(email);
    if (_valid) alert("Email Signup Not Implemented");
  };

  return (
    <StyledEmailSignup>
      <Header>Receive latest Backd updates</Header>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder="Enter your email"
          valid={valid}
          type="email"
          value={email}
          onChange={onChange}
        />
        <SubmitButton type="submit">submit</SubmitButton>
      </Form>
      <Note>We don’t share this with anyone.</Note>
    </StyledEmailSignup>
  );
};

export default EmailSignup;
