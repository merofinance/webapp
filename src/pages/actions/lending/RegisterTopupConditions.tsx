import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import * as yup from "yup";
import { FormikErrors, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import BackButton from "../../../components/BackButton";
import { AppDispatch } from "../../../app/store";
import { approve, selectBalance, selectToupAllowance } from "../../../state/userSlice";
import { useBackd } from "../../../app/hooks/use-backd";
import { ScaledNumber } from "../../../lib/scaled-number";
import { INFINITE_APPROVE_AMMOUNT } from "../../../lib/constants";
import { selectPool } from "../../../state/selectors";
import { Position } from "../../../lib/types";
import { hasPendingTransaction } from "../../../state/transactionsSlice";
import NewPositionConfirmation from "./RegisterTopupConfirmation";
import ApproveThenAction from "../../../components/ApproveThenAction";
import RegisterTopupInput from "./RegisterTopupInput";
import ActionSummary from "./ActionSummary";

interface TopupParams {
  address: string;
  protocol: string;
  poolName: string;
}

export interface FormType {
  threshold: string;
  singleTopUp: string;
  maxTopUp: string;
}

const initialValues: FormType = {
  threshold: "",
  singleTopUp: "",
  maxTopUp: "",
};

const validationSchema = yup.object().shape({
  threshold: yup
    .number()
    .required("pool.tabs.positions.fields.threshold.required")
    .moreThan(1.0, "pool.tabs.positions.fields.threshold.greaterThanOne"),
  singleTopUp: yup
    .string()
    .required("pool.tabs.positions.fields.single.required")
    .test("is-valid-number", "pool.tabs.positions.fields.single.invalid", (s: any) =>
      ScaledNumber.isValid(s)
    )
    .test(
      "is-positive-number",
      "pool.tabs.positions.fields.single.positive",
      (s: any) => !ScaledNumber.fromUnscaled(s).isZero()
    ),
  maxTopUp: yup
    .string()
    .required("pool.tabs.positions.fields.max.required")
    .test("is-valid-number", "pool.tabs.positions.fields.max.invalid", (s: any) =>
      ScaledNumber.isValid(s)
    )
    .test(
      "is-positive-number",
      "pool.tabs.positions.fields.max.invalid",
      (s: any) => !ScaledNumber.fromUnscaled(s).isZero()
    ),
});

const wrapperFormik = () =>
  useFormik<FormType>({
    initialValues,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  });
export type FormikFormType = ReturnType<typeof wrapperFormik>;

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.25px;
  margin-bottom: 2rem;
  margin-top: 3rem;
`;

const SubHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  opacity: 0.8;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:last-child {
    justify-content: flex-end;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisterTopupConditions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const history = useHistory();
  const { address, protocol, poolName } = useParams<TopupParams>();
  const pool = useSelector(selectPool(poolName));
  const balance = useSelector(selectBalance(pool));
  const loading = useSelector(hasPendingTransaction("Approve"));
  const [confirming, setConfirming] = useState(false);

  if (!pool) {
    history.push("/");
    throw Error("Pool not found");
  }

  if (!backd) {
    history.push("/");
    throw Error("Wallet not connected");
  }

  const allowance = useSelector(selectToupAllowance(backd, pool));

  const onSubmit = () => {
    if (approved) setConfirming(true);
    else executeApprove();
  };

  const executeApprove = () => {
    if (!backd) return;
    dispatch(
      approve({
        amount: ScaledNumber.fromUnscaled(INFINITE_APPROVE_AMMOUNT, pool.underlying.decimals),
        backd,
        spender: backd.topupActionAddress,
        token: pool.lpToken,
      })
    );
  };

  const validate = (values: FormType): FormikErrors<FormType> => {
    const errors: FormikErrors<FormType> = {};
    const single = ScaledNumber.fromUnscaled(values.singleTopUp, pool.underlying.decimals);
    const max = ScaledNumber.fromUnscaled(values.maxTopUp, pool.underlying.decimals);
    if (values.maxTopUp && single.gt(max))
      errors.singleTopUp = "pool.tabs.positions.fields.single.lessThanMax";
    if (max.gt(balance)) errors.maxTopUp = "pool.tabs.positions.fields.max.exceedsBalance";
    return errors;
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit, validate });

  const approved = allowance.gte(
    ScaledNumber.fromUnscaled(formik.values.maxTopUp, pool.underlying.decimals)
  );

  const position: Position = {
    protocol,
    account: address,
    threshold: ScaledNumber.fromUnscaled(formik.values.threshold),
    singleTopUp: ScaledNumber.fromUnscaled(formik.values.singleTopUp, pool.underlying.decimals),
    maxTopUp: ScaledNumber.fromUnscaled(formik.values.maxTopUp, pool.underlying.decimals),
    maxGasPrice: 0,
    actionToken: pool.underlying.address,
    depositToken: pool.lpToken.address,
  };

  const buttonHoverText = () => {
    if (!formik.values.threshold) return t("pool.tabs.positions.fields.threshold.hover");
    if (!formik.values.singleTopUp) return t("pool.tabs.positions.fields.single.hover");
    if (!formik.values.maxTopUp) return t("pool.tabs.positions.fields.max.hover");
    return "";
  };

  return (
    <Container>
      <BackButton />
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="4/4"
        content={
          <Content>
            <ActionSummary />
            <Header>{t("actions.topup.stages.conditions.header")}</Header>
            <SubHeader>{t("actions.topup.stages.conditions.subHeader")}</SubHeader>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <RegisterTopupInput
                label={t("pool.tabs.positions.fields.threshold.label")}
                tooltip={t("pool.tabs.positions.fields.threshold.tooltip")}
                type="number"
                name="threshold"
                formik={formik}
                placeholder="1.4"
              />
              <RegisterTopupInput
                label={t("pool.tabs.positions.fields.single.label")}
                tooltip={t("pool.tabs.positions.fields.single.tooltip")}
                type="number"
                name="singleTopUp"
                formik={formik}
                placeholder={`2,000 ${pool.underlying.symbol}`}
              />
              <RegisterTopupInput
                label={t("pool.tabs.positions.fields.max.label")}
                tooltip={t("pool.tabs.positions.fields.max.tooltip")}
                type="number"
                name="maxTopUp"
                formik={formik}
                placeholder={`10,000 ${pool.underlying.symbol}`}
              />
              <ButtonContainer>
                <ApproveThenAction
                  label={t("pool.tabs.positions.buttons.create")}
                  action={formik.handleSubmit}
                  value={ScaledNumber.fromUnscaled(
                    formik.values.maxTopUp,
                    pool.underlying.decimals
                  )}
                  loading={loading}
                  disabled={!formik.dirty || !formik.isValid || loading}
                  token={pool.lpToken}
                  contract={backd.topupActionAddress}
                  hoverText={buttonHoverText()}
                />
              </ButtonContainer>
            </Form>
          </Content>
        }
      />
      <NewPositionConfirmation
        show={confirming}
        close={() => setConfirming(false)}
        position={position}
        pool={pool}
        complete={() => {
          formik.resetForm({ values: initialValues });
          history.push("/actions");
        }}
      />
    </Container>
  );
};

export default RegisterTopupConditions;
