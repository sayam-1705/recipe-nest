import React from "react";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorIcon = () => (
  <svg
    className="mx-auto h-16 w-16 text-red-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = "Something went wrong",
  message = "We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.",
  onRetry,
  className = "min-h-[400px] flex items-center justify-center bg-gray-50",
}) => (
  <div className={className}>
    <div className="text-center p-8 max-w-md">
      <div className="mb-6">
        <ErrorIcon />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary-orange hover:bg-primary-orange-hover text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Try again
        </button>
      )}
    </div>
  </div>
);

export default ErrorDisplay;
