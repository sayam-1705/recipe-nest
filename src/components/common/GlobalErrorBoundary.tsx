"use client";

import React from "react";
import ErrorDisplay from "./ErrorDisplay";

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class GlobalErrorBoundary extends React.Component<
  GlobalErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Global Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const message =
        this.state.error?.message ||
        "An unexpected error occurred. Please try reloading the page.";
      return (
        <ErrorDisplay
          title="Application Error"
          message={message}
          onRetry={() => window.location.reload()}
          fullPage={true}
        />
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
