import React, { FormEvent, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { apiPost } from "../services/apiService";
import Input from "./Input";
import Button from "./styles/Button";

const StyledEmailSignup = styled.div`
  width: 38.8rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

type ContentProps = {
  show: boolean;
};

const Content = styled.div`
  width: 100%;
  display: ${(props: ContentProps) => (props.show ? "flex" : "none")};
  flex-direction: column;

  @media (max-width: 600px) {
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
  align-items: flex-start;

  > div:first-child {
    margin-right: 1.6rem;
  }
`;

const EmailSignup = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(true);
  const [validate, setValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const _valid = email ? re.test(String(email).toLowerCase()) : true;
    setValid(_valid);
    return _valid;
  };

  const onChange = (value: string) => {
    if (validate) setValid(validateEmail(value));
    setEmail(value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidate(true);
    if (!validateEmail(email)) return;
    setLoading(true);
    await apiPost("https://register.backd.fund", JSON.stringify({ email }));
    // TODO: Add error handing
    setLoading(false);
  };

  return (
    <StyledEmailSignup>
      <Content show={location.pathname === "/"}>
        <Header>Receive latest Backd updates</Header>
        <Form onSubmit={onSubmit}>
          <Input
            label="Enter your email"
            valid={valid}
            value={email}
            onChange={(v: string) => onChange(v)}
            type="email"
            note="We don’t share this with anyone."
            errorMessage="This email is incorrect."
          />
          <Button primary submit square text="submit" loading={loading} />
        </Form>
      </Content>
    </StyledEmailSignup>
  );
};

export default EmailSignup;
