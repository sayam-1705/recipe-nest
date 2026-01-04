"use client";

import React, { Component, ErrorInfo } from "react";
import ErrorDisplay from "./ErrorDisplay";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      const message =
        this.state.error?.message || "An unexpected error occurred";
      return (
        this.props.fallback || (
          <ErrorDisplay
            title="Something went wrong"
            message={message}
            onRetry={this.handleRetry}
          />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
