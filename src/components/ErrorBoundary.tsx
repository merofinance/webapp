import { ErrorInfo, ReactNode, Component } from "react";

import { AppDispatch } from "../app/store";
import { setError } from "../state/errorSlice";

interface ErrorBoundaryProps {
  dispatch: AppDispatch;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, any> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.dispatch(setError({ message: error.message }));
  }

  static getDerivedStateFromError(): any {
    return {};
  }

  render(): ReactNode {
    return this.props.children;
  }
}
