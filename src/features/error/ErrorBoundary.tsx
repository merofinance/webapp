import React, { ErrorInfo } from "react";
import { AppDispatch } from "../../app/store";
import { setError } from "../../state/errorSlice";

type ErrorBoundaryProps = {
  dispatch: AppDispatch;
};
type ErrorBoundaryState = {};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(error: Error) {
    return {};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.dispatch(setError({ error: error.message }));
  }

  render() {
    return this.props.children;
  }
}
