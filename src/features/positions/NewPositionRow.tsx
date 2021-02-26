import classNames from "classnames";
import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";
import styles from "./Positions.module.scss";

const placeHolderAddress = "0xbac102e9f93Be062EB03A3de2A515C67993D220c";

const validationSchema = yup.object().shape({
  protocol: yup.string().required(),
  address: yup.string().required(),
  threshold: yup.number().required(),
  singleTopUpAmount: yup.number().required().positive(),
  totalTopUpAmount: yup.number().required().positive(),
});

const initialValues = {
  protocol: "Aave",
  address: "",
  threshold: "",
  singleTopUpAmount: "",
  totalTopUpAmount: "",
};

export function NewPositionRow() {
  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    isValid,
    errors,
  } = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <Form
      className={classNames(styles["table-row"], styles["table-form"])}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className={styles["table-cell"]}>
        <Form.Control name="protocol" as="select" custom>
          <option>Aave</option>
          <option>Compound</option>
        </Form.Control>
      </div>

      <div className={styles["table-cell"]}>
        <Form.Control
          type="text"
          name="address"
          placeholder={placeHolderAddress}
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.address && !!errors.address}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.address}
        </Form.Control.Feedback>
      </div>

      <div className={styles["table-cell"]}>
        <Form.Control
          type="number"
          name="threshold"
          placeholder="1.05"
          value={values.threshold}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.threshold && !!errors.threshold}
        />

        <Form.Control.Feedback type="invalid" tooltip>
          {errors.threshold}
        </Form.Control.Feedback>
      </div>

      <div className={styles["table-cell"]}>
        <Form.Control
          type="number"
          name="singleTopUpAmount"
          placeholder="1,500"
          value={values.singleTopUpAmount}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.singleTopUpAmount && !!errors.singleTopUpAmount}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.singleTopUpAmount}
        </Form.Control.Feedback>
      </div>

      <div className={styles["table-cell"]}>
        <Form.Control
          type="number"
          name="totalTopUpAmount"
          placeholder="4,500"
          value={values.totalTopUpAmount}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={!!errors.totalTopUpAmount && touched.totalTopUpAmount}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.totalTopUpAmount}
        </Form.Control.Feedback>
      </div>

      <div className={styles["table-cell"]}>
        <Button disabled={!isValid} aria-disabled={!isValid} type="submit">
          Add
        </Button>
      </div>
    </Form>
  );
}
