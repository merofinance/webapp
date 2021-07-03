import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import Popup from "../../components/Popup";
import { Paragraph } from "../../components/styles/Headers";

import { selectError, setError } from "./errorSlice";

export function ErrorAlert() {
  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();

  return (
    <Popup
      show={!!error}
      close={() => dispatch(setError({ error: "" }))}
      header="an error occured"
      content={<Paragraph>{error}</Paragraph>}
    />
  );
}
