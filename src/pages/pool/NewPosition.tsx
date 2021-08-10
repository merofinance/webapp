import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ethers } from "ethers";
import * as yup from "yup";
import { useFormik } from "formik";

import { useBackd } from "../../app/hooks/use-backd";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { approve, selectBalance, selectToupAllowance } from "../../state/userSlice";
import { Pool } from "../../lib";
import { Position } from "../../lib/types";
import NewPositionConfirmation from "./NewPositionConfirmation";
import NewPositionInput from "./NewPositionInput";
import { AppDispatch } from "../../app/store";
import { selectPositions } from "../../state/positionsSlice";
import { TokenValue } from "../../lib/token-value";
import { INFINITE_APPROVE_AMMOUNT } from "../../lib/constants";
import { useDevice } from "../../app/hooks/use-device";

interface FormType {
  protocol: string;
  account: string;
  threshold: string;
  singleTopUp: string;
  maxTopUp: string;
}

const initialValues: FormType = {
  protocol: "",
  account: "",
  threshold: "",
  singleTopUp: "",
  maxTopUp: "",
};

const validationSchema = yup.object().shape({
  protocol: yup.string().required(),
  account: yup
    .string()
    .required("Address is required")
    .test(
      "is-address",
      "Invalid Address",
      (s: any) => typeof s === "string" && ethers.utils.isAddress(s)
    ),
  threshold: yup.number().required("Threshold is required").moreThan(1.0, "Must be greater than 1"),
  singleTopUp: yup
    .string()
    .required("Single Top Up is required")
    .test("is-valid-number", "Invalid number", (s: any) => {
      try {
        TokenValue.fromUnscaled(s);
        return true;
      } catch {
        return false;
      }
    })
    .test(
      "is-positive-number",
      "Must be positive number",
      (s: any) => !TokenValue.fromUnscaled(s).isZero()
    ),
  maxTopUp: yup
    .string()
    .required("Max Top Up required")
    .test("is-valid-number", "Invalid number", (s: any) => {
      try {
        TokenValue.fromUnscaled(s);
        return true;
      } catch {
        return false;
      }
    })
    .test(
      "is-positive-number",
      "Must be positive number",
      (s: any) => !TokenValue.fromUnscaled(s).isZero()
    ),
});

const Border = styled.div`
  width: 100%;
  background: linear-gradient(to right, #c532f9 1%, #32b2e5 101%);
  margin-top: 0.6rem;
  padding: 1px;

  border-radius: 1.3rem;
  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

const StyledNewPosition = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #451467, #173d63);

  padding: 0.9rem 2rem;
  border-radius: 1.2rem;
  @media (max-width: 600px) {
    align-items: center;
    justify-content: center;
    padding: 0 1.6rem;
    height: 3.8rem;
    border-radius: 0;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;

  > div:last-child {
    justify-content: flex-end;
  }
`;

const ErrorSpacing = styled.div`
  height: 2.8rem;
`;

export const Value = styled.div`
  flex: 1;
  font-weight: 400;
  font-size: 1.4rem;
  letter-spacing: 0.15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

interface Props {
  pool: Pool;
}

const NewPosition = ({ pool }: Props): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const { isMobile } = useDevice();
  const allowance = useSelector(selectToupAllowance(backd, pool));
  const balance = useSelector(selectBalance(pool));
  const positions = useSelector(selectPositions);
  const [confirming, setConfirming] = useState(false);

  const onSubmit = () => {
    if (approved) setConfirming(true);
    else executeApprove();
  };

  const executeApprove = () => {
    if (!backd) return;
    formik.setSubmitting(true);
    const approveArgs = {
      amount: TokenValue.fromUnscaled(INFINITE_APPROVE_AMMOUNT, pool.underlying.decimals),
      backd,
      spender: backd.topupActionAddress,
      token: pool.lpToken,
    };
    dispatch(approve(approveArgs)).then(() => {
      formik.setSubmitting(false);
    });
  };

  const validate = (values: FormType): Record<string, string> => {
    const errors: Record<string, string> = {};

    const matchingPositions = positions.filter(
      (position: Position) =>
        position.protocol === values.protocol && position.account === values.account
    );
    if (values.protocol && matchingPositions.length > 0)
      errors.account = "Max of one position per protocol and address";

    const single = TokenValue.fromUnscaled(values.singleTopUp, pool.underlying.decimals);
    const max = TokenValue.fromUnscaled(values.maxTopUp, pool.underlying.decimals);
    if (single.gt(max)) errors.single = "Must be less than max top up";
    if (max.gt(balance)) errors.maxTopUp = "Exceeds deposited balance";

    return errors;
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit, validate });

  const approved = allowance.gte(
    TokenValue.fromUnscaled(formik.values.maxTopUp, pool.underlying.decimals)
  );

  const position: Position = {
    protocol: formik.values.protocol,
    account: formik.values.account,
    threshold: Number(formik.values.threshold),
    singleTopUp: TokenValue.fromUnscaled(formik.values.singleTopUp, pool.underlying.decimals),
    maxTopUp: TokenValue.fromUnscaled(formik.values.maxTopUp, pool.underlying.decimals),
    maxGasPrice: 0,
    actionToken: pool.underlying.address,
    depositToken: pool.lpToken.address,
  };

  const buttonHoverText = () => {
    if (!formik.values.protocol) return "Select Protocol";
    if (!formik.values.account) return "Enter Address";
    if (!formik.values.threshold) return "Enter Threshold";
    if (!formik.values.singleTopUp) return "Enter Single Top Up";
    if (!formik.values.maxTopUp) return "Enter Max Top Up";
    return "";
  };

  return (
    <Border>
      <StyledNewPosition>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Value>
            <Dropdown
              value={formik.values.protocol}
              name="protocol"
              options={["Aave", "Compound"]}
              onChange={formik.handleChange}
            />
          </Value>
          <NewPositionInput type="text" name="account" formik={formik} />
          <NewPositionInput type="number" name="threshold" formik={formik} />
          <NewPositionInput type="number" name="singleTopUp" formik={formik} />
          <NewPositionInput type="number" name="maxTopUp" formik={formik} />
          <Value>
            <Button
              submit
              primary
              small={isMobile}
              disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
              text={approved && formik.values.maxTopUp !== "" ? "create 2/2" : "approve 1/2"}
              hoverText={buttonHoverText()}
              loading={formik.isSubmitting}
            />
          </Value>
        </Form>
        {!formik.isValid && <ErrorSpacing />}
      </StyledNewPosition>
      <NewPositionConfirmation
        show={confirming}
        close={() => setConfirming(false)}
        position={position}
        pool={pool}
        complete={() => formik.resetForm({ values: initialValues })}
      />
    </Border>
  );
};

export default NewPosition;
