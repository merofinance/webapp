import classNames from "classnames";
import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";
import { Position } from "../../lib/types";
import styles from "./Positions.module.scss";

const placeHolderAddress = "0xbac102e9f93Be062EB03A3de2A515C67993D220c";

const validationSchema = yup.object().shape({
  protocol: yup.string().required(),
  account: yup.string().required(),
  threshold: yup.number().required(),
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

export function NewPositionRow() {
  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
    setTimeout(() => formik.setSubmitting(false), 3000);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <Form
      className={classNames(styles["table-row"], styles["table-form"])}
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <div className={styles["table-cell"]}>
        <Form.Control
          name="protocol"
          as="select"
          custom
          disabled={formik.isSubmitting}
        >
          <option>Aave</option>
          <option>Compound</option>
        </Form.Control>
      </div>

      <CellControl
        formik={formik}
        type="text"
        name="account"
        placeHolder={placeHolderAddress}
      />

      <CellControl
        formik={formik}
        type="number"
        name="threshold"
        placeHolder="1.05"
      />

      <CellControl
        formik={formik}
        type="number"
        name="singleTopUp"
        placeHolder="1,500"
      />

      <CellControl
        formik={formik}
        type="number"
        name="totalTopUp"
        placeHolder="4,500"
      />

      <div className={styles["table-cell"]}>
        <Button
          disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
          type="submit"
        >
          Add
        </Button>
      </div>
    </Form>
  );
}
