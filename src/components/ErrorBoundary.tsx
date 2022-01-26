import { ErrorInfo, ReactNode, Component } from "react";
import * as Sentry from "@sentry/browser";

import { AppDispatch } from "../app/store";
import { setError } from "../state/errorSlice";

interface ErrorBoundaryProps {
  dispatch: AppDispatch;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, any> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.dispatch(setError({ message: error.message }));
    Sentry.withScope((scope) => {
      scope.setExtra("componentStack", errorInfo);
      Sentry.captureException(error);
    });
  }

  static getDerivedStateFromError(): any {
    return {};
  }

  render(): ReactNode {
    return this.props.children;
  }
}
