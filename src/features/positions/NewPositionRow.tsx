import classNames from "classnames";
import { ethers } from "ethers";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useBackd } from "../../app/hooks/use-backd";
import { AppDispatch } from "../../app/store";
import { ButtonSpinner } from "../../components/button-spinner/ButtonSpinner";
import { Pool, Position, positionFromPartial } from "../../lib/types";
import { approve, selectBalance, selectToupAllowance } from "../user/userSlice";
import { NewPositionModal } from "./NewPositionModal";
import styles from "./Positions.module.scss";
import { registerPosition } from "./positionsSlice";

const placeHolderAddress = "0xbac102e9f93Be062EB03A3de2A515C67993D220c";

const validationSchema = yup.object().shape({
  protocol: yup.string().required(),
  account: yup
    .string()
    .required()
    .test(
      "is-address",
      "is not a valid address",
      (s: any) => typeof s === "string" && ethers.utils.isAddress(s)
    ),
  threshold: yup.number().required().moreThan(1.0),
  singleTopUp: yup.number().required().positive(),
  totalTopUp: yup.number().required().positive(),
});

const initialValues: Partial<Position> = {
  protocol: "Aave",
};

type CellControlProps = {
  formik: ReturnType<typeof useFormik>;
  type: string;
  name: string;
  placeHolder: string;
};

function CellControl({ formik, type, name, placeHolder }: CellControlProps) {
  return (
    <div className={styles["table-cell"]}>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeHolder}
        value={formik.values[name] || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched[name] && !!formik.errors[name]}
        disabled={formik.isSubmitting}
      />
      <Form.Control.Feedback type="invalid" tooltip>
        {formik.errors[name]}
      </Form.Control.Feedback>
    </div>
  );
}

type NewPositionRowProps = {
  pool: Pool;
};

export function NewPositionRow({ pool }: NewPositionRowProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const backd = useBackd();
  const dispatch = useDispatch<AppDispatch>();
  const allowance = useSelector(selectToupAllowance(backd, pool));
  const balance = useSelector(selectBalance(pool.lpToken.address));

  const executeApprove = (amount: number) => {
    if (!backd) return;

    const approveArgs = { amount, backd, spender: backd.topupActionAddress, token: pool.lpToken };
    dispatch(approve(approveArgs)).then(() => {
      formik.setSubmitting(false);
    });
  };

  const executeRegister = (values: Partial<Position>) => {
    if (!backd) return;

    const position = positionFromPartial(pool, values);
    dispatch(registerPosition({ position, pool, backd })).then((v) => {
      formik.setSubmitting(false);
      if (v.meta.requestStatus !== "rejected") {
        formik.resetForm({ values: initialValues });
      }
    });
  };

  const validate = (values: Partial<Position>): Record<string, string> => {
    const errors: Record<string, string> = {};
    const totalTopUp = values.totalTopUp || 0;
    const singleTopUp = values.singleTopUp || 0;
    if (totalTopUp > balance) {
      errors.totalTopUp = "Not enough funds available";
    }
    if (totalTopUp < singleTopUp) {
      errors.totalTopUp = "Must be greater than single topup";
    }
    return errors;
  };

  const onSubmit = (values: Partial<Position>) => {
    formik.setSubmitting(true);
    const topupValue = values.totalTopUp || 0;
    if (allowance >= topupValue) {
      setShowConfirmModal(true);
    } else {
      executeApprove(topupValue);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit, validate });

  const topupValue = formik.values.totalTopUp || 0;
  const submitText = allowance >= topupValue ? "Register" : "Approve";

  const handleClose = () => {
    formik.setSubmitting(false);
    setShowConfirmModal(false);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    executeRegister(formik.values);
  };

  return (
    <Form
      className={classNames(styles["table-row"], styles["table-form"])}
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <div className={styles["table-cell"]}>
        <Form.Control
          value={formik.values.protocol}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="protocol"
          as="select"
          custom
          disabled={formik.isSubmitting}
        >
          <option>Aave</option>
          <option>Compound</option>
        </Form.Control>
      </div>

      <CellControl formik={formik} type="text" name="account" placeHolder={placeHolderAddress} />

      <CellControl formik={formik} type="number" name="threshold" placeHolder="1.05" />

      <CellControl formik={formik} type="number" name="singleTopUp" placeHolder="1,500" />

      <CellControl formik={formik} type="number" name="totalTopUp" placeHolder="4,500" />

      <div className={styles["table-cell"]}>
        <Button disabled={!formik.dirty || !formik.isValid || formik.isSubmitting} type="submit">
          <ButtonSpinner show={formik.isSubmitting} />
          {submitText}
        </Button>
      </div>

      <NewPositionModal
        show={showConfirmModal}
        pool={pool}
        position={formik.values}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </Form>
  );
}
