import classnames from "classnames";
import React from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";

import styles from "./error.module.scss";
import { selectError, setError } from "./errorSlice";

export function ErrorAlert() {
  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();

  return error ? (
    <Alert
      className={classnames(["fixed-top", styles["global-alert"]])}
      variant="danger"
      onClose={() => dispatch(setError({ error: "" }))}
      dismissible
    >
      An error has occured: "{error}". <br />
      Please try again in a moment. If the error persists, you can contact us{" "}
      <a href="https://t.me/backdchat">on Telegram</a>
    </Alert>
  ) : null;
}
