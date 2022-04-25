import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { FormikErrors, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber, ethers } from "ethers";
import { ScaledNumber } from "scaled-number";

import { useBackd } from "../../../../app/hooks/use-backd";
import { selectUsersPoolUnderlyingUnlocked } from "../../../../state/valueSelectors";
import ApproveThenAction from "../../../../components/ApproveThenAction";
import { useDevice } from "../../../../app/hooks/use-device";
import { selectPool, selectEthPrice, selectPrice } from "../../../../state/poolsListSlice";
import {
  GWEI_DECIMALS,
  RECOMMENDED_THRESHOLD,
  TOPUP_ACTION_ROUTE,
} from "../../../../lib/constants";
import {
  addSuggestion,
  removeSuggestion,
  selectActiveSuggestion,
  SuggestionType,
} from "../../../../state/helpSlice";
import { Loan, Optional, Position } from "../../../../lib/types";
import { selectLoans } from "../../../../state/lendingSlice";
import TopupInput from "./TopupInput";
import TopupConfirmation from "./TopupConfirmation";
import { selectEthBalance } from "../../../../state/userSlice";
import { selectEstimatedGasUsage } from "../../../../state/positionsSlice";
import { useNavigateToTop } from "../../../../app/hooks/use-navigate-to-top";
import { DOCS_TOPUPS_LINK } from "../../../../lib/links";

export interface FormType {
  threshold: string;
  singleTopUp: string;
  maxTopUp: string;
  priorityFee: string;
  maxGasPrice: string;
}

const initialValues: FormType = {
  threshold: "",
  singleTopUp: "",
  maxTopUp: "",
  priorityFee: "",
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
  priorityFee: yup
    .string()
    .required("actions.topup.fields.priority.required")
    .test("is-valid-number", "actions.topup.fields.priority.invalid", (s: any) =>
      ScaledNumber.isValid(s)
    ),
  maxGasPrice: yup
    .string()
    .required("actions.topup.fields.gas.required")
    .test("is-valid-number", "actions.topup.fields.priority.invalid", (s: any) =>
      ScaledNumber.isValid(s)
    )
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

const TopupConditionsForm = (): Optional<JSX.Element> => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const backd = useBackd();
  const navigate = useNavigateToTop();
  const { isMobile } = useDevice();
  const { address, protocol, poolName } = useParams<"address" | "protocol" | "poolName">();

  const pool = useSelector(selectPool(poolName));
  const underlyingPrice = useSelector(selectPrice(pool));
  const ethPrice = useSelector(selectEthPrice);
  const usersPoolUnderlyingUnlocked = useSelector(selectUsersPoolUnderlyingUnlocked(pool));
  const implement = useSelector(selectActiveSuggestion);
  const estimatedGasUsage = useSelector(selectEstimatedGasUsage);
  const ethBalance = useSelector(selectEthBalance);

  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const loans = useSelector(selectLoans(address));
  const loan = loans.filter((loan: Loan) => loan.protocol === protocol)[0];

  useEffect(() => {
    if (implement) {
      if (implement.type === SuggestionType.THRESHOLD_LOW) {
        formik.setFieldValue("threshold", RECOMMENDED_THRESHOLD, true);
        dispatch(removeSuggestion(SuggestionType.THRESHOLD_LOW));
      } else if (implement.type === SuggestionType.THRESHOLD_HIGH) {
        formik.setFieldValue("threshold", suggestedMaximumTreshold(), true);
        dispatch(removeSuggestion(SuggestionType.THRESHOLD_HIGH));
      } else if (implement.type === SuggestionType.SINGLE_LOW) {
        formik.setFieldValue("singleTopUp", suggestedSingleTopup(), true);
        dispatch(removeSuggestion(SuggestionType.SINGLE_LOW));
      }
    }
    return () => {
      dispatch(removeSuggestion(SuggestionType.THRESHOLD_LOW));
      dispatch(removeSuggestion(SuggestionType.THRESHOLD_HIGH));
      dispatch(removeSuggestion(SuggestionType.SINGLE_LOW));
    };
  }, [implement]);

  const ethValue = (): Optional<BigNumber> => {
    if (!estimatedGasUsage) return null;
    const topups = Math.ceil(Number(position.maxTopUp.div(position.singleTopUp).toString()));
    return estimatedGasUsage.value.mul(position.maxGasPrice.value).mul(topups);
  };

  const validate = (values: FormType): FormikErrors<FormType> => {
    const errors: FormikErrors<FormType> = {};
    if (!pool || !usersPoolUnderlyingUnlocked) return errors;
    const single = ScaledNumber.fromUnscaled(values.singleTopUp, pool.underlying.decimals);
    const max = ScaledNumber.fromUnscaled(values.maxTopUp, pool.underlying.decimals);

    // Validating Maximum Top-up is Greater than Single
    if (values.maxTopUp && single.gt(max)) {
      errors.singleTopUp = "actions.topup.fields.single.lessThanMax";
    }

    // Validating that user has enough balance for top-up
    if (max.gt(usersPoolUnderlyingUnlocked)) {
      errors.maxTopUp = "actions.topup.fields.max.exceedsBalance";
    }

    // Validating that user has enough ETH for Gas Bank
    const ethNeeded = ethValue();
    if (ethNeeded && ethBalance && ethNeeded.gt(ethBalance.value)) {
      const needed = new ScaledNumber(ethNeeded).toCryptoString();
      errors.maxGasPrice = t("actions.topup.fields.gas.notEnoughEth", { needed });
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
    return null;
  }
  if (!ethers.utils.isAddress(address)) {
    navigate(TOPUP_ACTION_ROUTE);
    return null;
  }

  if (!backd) return null;

  const buttonHoverText = () => {
    if (!formik.values.threshold) return t("actions.topup.fields.threshold.hover");
    if (!formik.values.singleTopUp) return t("actions.topup.fields.single.hover");
    if (!formik.values.maxTopUp) return t("actions.topup.fields.max.hover");
    if (!formik.values.priorityFee) return t("actions.topup.fields.priority.hover");
    if (!formik.values.maxGasPrice) return t("actions.topup.fields.gas.hover");
    return "";
  };

  const position: Position = {
    protocol,
    account: address,
    threshold: ScaledNumber.fromUnscaled(formik.values.threshold),
    singleTopUp: ScaledNumber.fromUnscaled(formik.values.singleTopUp, pool.underlying.decimals),
    maxTopUp: ScaledNumber.fromUnscaled(formik.values.maxTopUp, pool.underlying.decimals),
    priorityFee: ScaledNumber.fromUnscaled(formik.values.priorityFee, GWEI_DECIMALS),
    maxGasPrice: ScaledNumber.fromUnscaled(formik.values.maxGasPrice, GWEI_DECIMALS),
    actionToken: pool.underlying.address,
    depositToken: pool.lpToken.address,
    depositTokenBalance: ScaledNumber.fromUnscaled(0),
  };

  const suggestedMaximumTreshold = () => {
    if (!formik.values.threshold || !loan) return 0;
    if (Number(loan.healthFactor.toCryptoString({ useGrouping: false })) >= RECOMMENDED_THRESHOLD) {
      return RECOMMENDED_THRESHOLD;
    }
    return Number(
      loan.healthFactor
        .add(ScaledNumber.fromUnscaled(1))
        .div(2)
        .toCryptoString({ useGrouping: false })
    );
  };

  const suggestedSingleTopup = () => {
    if (
      !loan ||
      !formik.values.singleTopUp ||
      !ScaledNumber.isValid(formik.values.singleTopUp) ||
      !ethPrice ||
      !underlyingPrice ||
      !estimatedGasUsage
    )
      return "";
    const max = ScaledNumber.fromUnscaled(formik.values.maxGasPrice, GWEI_DECIMALS);
    const gasCost = new ScaledNumber(estimatedGasUsage.value.mul(max.value));
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
      underlyingPrice &&
      estimatedGasUsage &&
      formik.values.maxGasPrice &&
      ScaledNumber.isValid(formik.values.maxGasPrice)
    ) {
      const single = ScaledNumber.fromUnscaled(formik.values.singleTopUp);
      const max = ScaledNumber.fromUnscaled(formik.values.maxGasPrice, GWEI_DECIMALS);
      const singleTopupUsd = single.mul(underlyingPrice);
      const gasCost = new ScaledNumber(estimatedGasUsage.value.mul(max.value));
      const gasCostUsd = gasCost.mul(ethPrice);
      if (singleTopupUsd.mul(0.25).lte(gasCostUsd)) {
        dispatch(
          addSuggestion({
            type: SuggestionType.SINGLE_LOW,
            text: t("liveHelp.suggestions.singleLow.text", {
              maxGas: gasCost.toUsdValue(ethPrice),
              ethAmount: gasCost.toCryptoString(),
              single: single.toUsdValue(underlyingPrice),
              underlyingAmount: single.toCryptoString(),
              underlyingSymbol: pool.underlying.symbol,
              suggestion: suggestedSingleTopup(),
            }),
            button: t("liveHelp.suggestions.singleLow.button"),
            link: DOCS_TOPUPS_LINK,
          })
        );
        return;
      }
    }
    dispatch(removeSuggestion(SuggestionType.SINGLE_LOW));
  };

  return (
    <>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <TopupInput
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
              Number(formik.values.threshold) < RECOMMENDED_THRESHOLD &&
              Number(loan.healthFactor.toCryptoString({ useGrouping: false })) >
                RECOMMENDED_THRESHOLD
            ) {
              dispatch(
                addSuggestion({
                  type: SuggestionType.THRESHOLD_LOW,
                  text: t("liveHelp.suggestions.thresholdLow.text", {
                    threshold: formik.values.threshold,
                    recommendedThreshold: RECOMMENDED_THRESHOLD,
                  }),
                  button: t("liveHelp.suggestions.thresholdLow.button"),
                  link: DOCS_TOPUPS_LINK,
                })
              );
            } else {
              dispatch(removeSuggestion(SuggestionType.THRESHOLD_LOW));
            }
            if (
              formik.values.threshold &&
              loan &&
              Number(formik.values.threshold) >=
                Number(loan.healthFactor.toCryptoString({ useGrouping: false }))
            ) {
              dispatch(
                addSuggestion({
                  type: SuggestionType.THRESHOLD_HIGH,
                  text: t("liveHelp.suggestions.thresholdHigh.text", {
                    threshold: formik.values.threshold,
                    recommendedThreshold: suggestedMaximumTreshold(),
                  }),
                  button: t("liveHelp.suggestions.thresholdHigh.button"),
                  link: DOCS_TOPUPS_LINK,
                })
              );
            } else {
              dispatch(removeSuggestion(SuggestionType.THRESHOLD_HIGH));
            }
          }}
        />
        <TopupInput
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
        <TopupInput
          label={
            isMobile ? t("actions.topup.fields.max.label") : t("actions.topup.fields.max.question")
          }
          tooltip={t("actions.topup.fields.max.tooltip")}
          type="number"
          name="maxTopUp"
          formik={formik}
          placeholder={`10,000 ${pool.underlying.symbol}`}
          setMax={() =>
            formik.setFieldValue("maxTopUp", usersPoolUnderlyingUnlocked?.toString(), true)
          }
        />
        <TopupInput
          label={
            isMobile
              ? t("actions.topup.fields.priority.label")
              : t("actions.topup.fields.priority.question")
          }
          tooltip={t("actions.topup.fields.priority.tooltip")}
          type="number"
          name="priorityFee"
          formik={formik}
          placeholder="3 Gwei"
        />
        <TopupInput
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
            contract={backd.topupActionAddress || ""}
            hoverText={buttonHoverText()}
          />
        </ButtonContainer>
      </Form>
      <TopupConfirmation
        show={confirming}
        close={() => {
          setConfirming(false);
          setLoading(false);
        }}
        position={position}
        value={ethValue()}
        pool={pool}
        complete={() => {
          formik.resetForm({ values: initialValues });
          navigate("/actions");
        }}
      />
    </>
  );
};

export default TopupConditionsForm;
