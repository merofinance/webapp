import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import * as yup from "yup";
import { FormikErrors, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { selectPoolBalance } from "../../../state/userSlice";
import { useBackd } from "../../../app/hooks/use-backd";
import { ScaledNumber } from "../../../lib/scaled-number";
import { selectPool, selectPrice } from "../../../state/selectors";
import ApproveThenAction from "../../../components/ApproveThenAction";
import RegisterTopupInput from "./RegisterTopupInput";
import { useDevice } from "../../../app/hooks/use-device";
import { selectEthPrice } from "../../../state/poolsListSlice";
import {
  GWEI_DECIMALS,
  GWEI_SCALE,
  RECOMMENDED_THRESHOLD,
  TOPUP_GAS_COST,
} from "../../../lib/constants";
import {
  addSuggestion,
  removeSuggestion,
  selectImplement,
  Suggestion,
} from "../../../state/helpSlice";
import NewPositionConfirmation from "./RegisterTopupConfirmation";
import { Loan, Position } from "../../../lib/types";
import { selectLoans } from "../../../state/lendingSlice";

interface TopupParams {
  address: string;
  protocol: string;
  poolName: string;
}

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

const RegisterTopupConditionsForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const backd = useBackd();
  const history = useHistory();
  const { isMobile } = useDevice();
  const { address, protocol, poolName } = useParams<TopupParams>();
  const pool = useSelector(selectPool(poolName));
  const underlyingPrice = useSelector(selectPrice(pool));
  const ethPrice = useSelector(selectEthPrice);
  const balance = useSelector(selectPoolBalance(pool));
  const implement = useSelector(selectImplement);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const loans = useSelector(selectLoans(address));
  const loan = loans.filter((loan: Loan) => loan.protocol === protocol)[0];

  useEffect(() => {
    if (implement) {
      if (implement.type === Suggestion.THRESHOLD_LOW) {
        formik.setFieldValue("threshold", RECOMMENDED_THRESHOLD, true);
        dispatch(removeSuggestion(Suggestion.THRESHOLD_LOW));
      } else if (implement.type === Suggestion.THRESHOLD_HIGH) {
        formik.setFieldValue("threshold", RECOMMENDED_THRESHOLD, true);
        dispatch(removeSuggestion(Suggestion.THRESHOLD_HIGH));
      } else if (implement.type === Suggestion.SINGLE_LOW) {
        formik.setFieldValue("singleTopUp", suggestedSingleTopup(), true);
        dispatch(removeSuggestion(Suggestion.SINGLE_LOW));
      }
    }
    return () => {
      dispatch(removeSuggestion(Suggestion.THRESHOLD_LOW));
      dispatch(removeSuggestion(Suggestion.THRESHOLD_HIGH));
      dispatch(removeSuggestion(Suggestion.SINGLE_LOW));
    };
  }, [implement]);

  const validate = (values: FormType): FormikErrors<FormType> => {
    const errors: FormikErrors<FormType> = {};
    if (!pool || !balance) return errors;
    const single = ScaledNumber.fromUnscaled(values.singleTopUp, pool.underlying.decimals);
    const max = ScaledNumber.fromUnscaled(values.maxTopUp, pool.underlying.decimals);
    if (values.maxTopUp && single.gt(max))
      errors.singleTopUp = "actions.topup.fields.single.lessThanMax";
    if (max.gt(balance)) errors.maxTopUp = "actions.topup.fields.max.exceedsBalance";
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

  if (!pool) {
    history.push(`/actions/register/topup/${address}/${protocol}`);
    return <></>;
  }

  if (!backd) return <></>;

  const buttonHoverText = () => {
    if (!formik.values.threshold) return t("actions.topup.fields.threshold.hover");
    if (!formik.values.singleTopUp) return t("actions.topup.fields.single.hover");
    if (!formik.values.maxTopUp) return t("actions.topup.fields.max.hover");
    if (!formik.values.maxGasPrice) return t("actions.topup.fields.gas.hover");
    return "";
  };

  const position: Position = {
    protocol,
    account: address,
    threshold: ScaledNumber.fromUnscaled(formik.values.threshold),
    singleTopUp: ScaledNumber.fromUnscaled(formik.values.singleTopUp, pool.underlying.decimals),
    maxTopUp: ScaledNumber.fromUnscaled(formik.values.maxTopUp, pool.underlying.decimals),
    maxGasPrice: ScaledNumber.fromUnscaled(formik.values.maxGasPrice, GWEI_DECIMALS),
    actionToken: pool.underlying.address,
    depositToken: pool.lpToken.address,
  };

  const suggestedSingleTopup = () => {
    if (
      !loan ||
      !formik.values.singleTopUp ||
      !ScaledNumber.isValid(formik.values.singleTopUp) ||
      !ethPrice ||
      !underlyingPrice
    )
      return "";
    const gas = ScaledNumber.fromUnscaled(formik.values.maxGasPrice, GWEI_DECIMALS);
    const gasCost = new ScaledNumber(gas.value.mul(TOPUP_GAS_COST).div(GWEI_SCALE));
    const gasCostUsd = gasCost.mul(ethPrice);
    return gasCostUsd
      .mul(5)
      .max(loan.totalCollateralETH.mul(ethPrice).mul(0.02))
      .div(underlyingPrice)
      .toCryptoString({ useGrouping: false });
  };

  const singleMinimumSuggestion = () => {
    if (
      loan &&
      formik.values.singleTopUp &&
      ScaledNumber.isValid(formik.values.singleTopUp) &&
      ethPrice &&
      underlyingPrice
    ) {
      const single = ScaledNumber.fromUnscaled(formik.values.singleTopUp, pool.underlying.decimals);
      const singleTopupUsd = single.mul(underlyingPrice);
      const gas = ScaledNumber.fromUnscaled(formik.values.maxGasPrice, GWEI_DECIMALS);
      const gasCost = new ScaledNumber(gas.value.mul(TOPUP_GAS_COST).div(GWEI_SCALE));
      const gasCostUsd = gasCost.mul(ethPrice);
      if (singleTopupUsd.mul(0.25).lte(gasCostUsd)) {
        dispatch(
          addSuggestion({
            type: Suggestion.SINGLE_LOW,
            text: t("liveHelp.suggestions.singleLow.text", {
              maxGas: gasCost.toUsdValue(ethPrice),
              ethAmount: gasCost,
              single: single.toUsdValue(underlyingPrice),
              underlyingAmount: single.toCryptoString(),
              underlyingSymbol: pool.underlying.symbol,
              suggestion: suggestedSingleTopup(),
            }),
            button: t("liveHelp.suggestions.singleLow.button"),
          })
        );
        return;
      }
    }
    dispatch(removeSuggestion(Suggestion.SINGLE_LOW));
  };

  return (
    <>
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
          onBlur={() => {
            if (
              formik.values.threshold &&
              Number(formik.values.threshold) < RECOMMENDED_THRESHOLD
            ) {
              dispatch(
                addSuggestion({
                  type: Suggestion.THRESHOLD_LOW,
                  text: t("liveHelp.suggestions.thresholdLow.text", {
                    threshold: formik.values.threshold,
                    recommendedThreshold: RECOMMENDED_THRESHOLD,
                  }),
                  button: t("liveHelp.suggestions.thresholdLow.button"),
                })
              );
            } else {
              dispatch(removeSuggestion(Suggestion.THRESHOLD_LOW));
            }
            if (
              formik.values.threshold &&
              loan &&
              Number(formik.values.threshold) >=
                Number(loan.healthFactor.toCryptoString({ useGrouping: false }))
            ) {
              dispatch(
                addSuggestion({
                  type: Suggestion.THRESHOLD_HIGH,
                  text: t("liveHelp.suggestions.thresholdHigh.text", {
                    threshold: formik.values.threshold,
                    recommendedThreshold: RECOMMENDED_THRESHOLD,
                  }),
                  button: t("liveHelp.suggestions.thresholdHigh.button"),
                })
              );
            } else {
              dispatch(removeSuggestion(Suggestion.THRESHOLD_HIGH));
            }
          }}
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
          onBlur={() => {
            singleMinimumSuggestion();
          }}
        />
        <RegisterTopupInput
          label={
            isMobile ? t("actions.topup.fields.max.label") : t("actions.topup.fields.max.question")
          }
          tooltip={t("actions.topup.fields.max.tooltip")}
          type="number"
          name="maxTopUp"
          formik={formik}
          placeholder={`10,000 ${pool.underlying.symbol}`}
        />
        <RegisterTopupInput
          label={
            isMobile ? t("actions.topup.fields.gas.label") : t("actions.topup.fields.gas.question")
          }
          tooltip={t("actions.topup.fields.gas.tooltip")}
          type="number"
          name="maxGasPrice"
          formik={formik}
          placeholder="200 Gwei"
          onBlur={() => {
            singleMinimumSuggestion();
          }}
        />
        <ButtonContainer>
          <ApproveThenAction
            label={t("actions.register.create")}
            action={formik.handleSubmit}
            value={ScaledNumber.fromUnscaled(formik.values.maxTopUp, pool.underlying.decimals)}
            loading={loading}
            disabled={!formik.dirty || !formik.isValid || loading}
            token={pool.lpToken}
            contract={backd.topupActionAddress}
            hoverText={buttonHoverText()}
          />
        </ButtonContainer>
      </Form>
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
          history.push("/actions");
        }}
      />
    </>
  );
};

export default RegisterTopupConditionsForm;
