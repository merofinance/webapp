import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import { FormikErrors, useFormik } from "formik";
import { useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import { selectBalance } from "../../../state/userSlice";
import { useBackd } from "../../../app/hooks/use-backd";
import { ScaledNumber } from "../../../lib/scaled-number";
import { selectPool, selectPrice } from "../../../state/selectors";
import { Position } from "../../../lib/types";
import NewPositionConfirmation from "./RegisterTopupConfirmation";
import ApproveThenAction from "../../../components/ApproveThenAction";
import RegisterTopupInput from "./RegisterTopupInput";
import ActionSummary from "./ActionSummary";
import { useDevice } from "../../../app/hooks/use-device";
import { selectEthPrice } from "../../../state/poolsListSlice";
import {
  GWEI_DECIMALS,
  GWEI_SCALE,
  TOPUP_ACTION_ROUTE,
  TOPUP_GAS_COST,
} from "../../../lib/constants";

export interface FormType {
  threshold: string;
  singleTopUp: string;
  maxTopUp: string;
  maxGasPrice: string;
}

const initialValues: FormType = {
  threshold: "",
  singleTopUp: "",
  maxTopUp: "",
  maxGasPrice: "",
};

const validationSchema = yup.object().shape({
  threshold: yup
    .number()
    .required("actions.topup.fields.threshold.required")
    .moreThan(1.0, "actions.topup.fields.threshold.greaterThanOne"),
  singleTopUp: yup
    .string()
    .required("actions.topup.fields.single.required")
    .test("is-valid-number", "actions.topup.fields.single.invalid", (s: any) =>
      ScaledNumber.isValid(s)
    )
    .test(
      "is-positive-number",
      "actions.topup.fields.single.positive",
      (s: any) => !ScaledNumber.fromUnscaled(s).isZero()
    ),
  maxTopUp: yup
    .string()
    .required("actions.topup.fields.max.required")
    .test("is-valid-number", "actions.topup.fields.max.invalid", (s: any) =>
      ScaledNumber.isValid(s)
    )
    .test(
      "is-positive-number",
      "actions.topup.fields.max.invalid",
      (s: any) => !ScaledNumber.fromUnscaled(s).isZero()
    ),
  maxGasPrice: yup
    .string()
    .required("actions.topup.fields.gas.required")
    .test("is-positive-number", "actions.topup.fields.gas.positive", (s: any) => Number(s) > 0),
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
  font-weight: 600;
  letter-spacing: 0.25px;
  margin-top: 3rem;

  font-size: 2.2rem;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const SubHeader = styled.div`
  font-weight: 500;
  opacity: 0.8;

  font-size: 1.7rem;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
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
  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const RegisterTopupConditions = (): JSX.Element => {
  const { t } = useTranslation();
  const backd = useBackd();
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  const { address, protocol, poolName } = useParams<"address" | "protocol" | "poolName">();
  const pool = useSelector(selectPool(poolName));
  const underlyingPrice = useSelector(selectPrice(pool));
  const ethPrice = useSelector(selectEthPrice);
  const balance = useSelector(selectBalance(pool));
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const validate = (values: FormType): FormikErrors<FormType> => {
    const errors: FormikErrors<FormType> = {};
    if (!pool) return errors;
    const single = ScaledNumber.fromUnscaled(values.singleTopUp, pool.underlying.decimals);
    const max = ScaledNumber.fromUnscaled(values.maxTopUp, pool.underlying.decimals);
    const gas = ScaledNumber.fromUnscaled(values.maxGasPrice, GWEI_DECIMALS);
    if (values.maxTopUp && single.gt(max))
      errors.singleTopUp = "actions.topup.fields.single.lessThanMax";
    if (max.gt(balance)) errors.maxTopUp = "actions.topup.fields.max.exceedsBalance";
    if (values.maxTopUp && values.maxGasPrice) {
      const maxTopupUsd = max.mul(underlyingPrice);
      const gasCostUsd = new ScaledNumber(gas.value.mul(TOPUP_GAS_COST).div(GWEI_SCALE)).mul(
        ethPrice
      );
      if (maxTopupUsd.lte(gasCostUsd)) errors.maxTopUp = "actions.topup.fields.gas.exceedsMax";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      setConfirming(true);
      setLoading(true);
    },
    validate,
  });

  if (!pool || !protocol || !address) {
    navigate(`${TOPUP_ACTION_ROUTE}/${address}/${protocol}`);
    return <div />;
  }

  if (!backd) return <div />;

  const position: Position = {
    protocol,
    account: address,
    threshold: ScaledNumber.fromUnscaled(formik.values.threshold),
    singleTopUp: ScaledNumber.fromUnscaled(formik.values.singleTopUp, pool.underlying.decimals),
    maxTopUp: ScaledNumber.fromUnscaled(formik.values.maxTopUp, pool.underlying.decimals),
    maxGasPrice: ScaledNumber.fromUnscaled(formik.values.maxGasPrice, 9),
    actionToken: pool.underlying.address,
    depositToken: pool.lpToken.address,
  };

  const buttonHoverText = () => {
    if (!formik.values.threshold) return t("actions.topup.fields.threshold.hover");
    if (!formik.values.singleTopUp) return t("actions.topup.fields.single.hover");
    if (!formik.values.maxTopUp) return t("actions.topup.fields.max.hover");
    if (!formik.values.maxGasPrice) return t("actions.topup.fields.gas.hover");
    return "";
  };

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="4/4"
        content={
          <Content>
            <ActionSummary />
            <Header id="register-topup-conditions-header">
              {t("actions.topup.stages.conditions.header")}
            </Header>
            <SubHeader>{t("actions.topup.stages.conditions.subHeader")}</SubHeader>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <RegisterTopupInput
                label={
                  isMobile
                    ? t("actions.topup.fields.threshold.label")
                    : t("actions.topup.fields.threshold.question")
                }
                tooltip={t("actions.topup.fields.threshold.tooltip")}
                type="number"
                name="threshold"
                formik={formik}
                placeholder="1.4"
              />
              <RegisterTopupInput
                label={
                  isMobile
                    ? t("actions.topup.fields.single.label")
                    : t("actions.topup.fields.single.question")
                }
                tooltip={t("actions.topup.fields.single.tooltip")}
                type="number"
                name="singleTopUp"
                formik={formik}
                placeholder={`2,000 ${pool.underlying.symbol}`}
              />
              <RegisterTopupInput
                label={
                  isMobile
                    ? t("actions.topup.fields.max.label")
                    : t("actions.topup.fields.max.question")
                }
                tooltip={t("actions.topup.fields.max.tooltip")}
                type="number"
                name="maxTopUp"
                formik={formik}
                placeholder={`10,000 ${pool.underlying.symbol}`}
              />
              <RegisterTopupInput
                label={
                  isMobile
                    ? t("actions.topup.fields.gas.label")
                    : t("actions.topup.fields.gas.question")
                }
                tooltip={t("actions.topup.fields.gas.tooltip")}
                type="number"
                name="maxGasPrice"
                formik={formik}
                placeholder="200 Gwei"
              />
              <ButtonContainer>
                <ApproveThenAction
                  label={t("actions.register.create")}
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
        close={() => {
          setConfirming(false);
          setLoading(false);
        }}
        position={position}
        pool={pool}
        complete={() => {
          formik.resetForm({ values: initialValues });
          navigate("/actions");
        }}
      />
    </Container>
  );
};

export default RegisterTopupConditions;
