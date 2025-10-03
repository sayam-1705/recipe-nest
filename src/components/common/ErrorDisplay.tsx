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
  className = "min-h-[300px] sm:min-h-[400px] flex items-center justify-center bg-gray-50 px-4 py-6",
}) => (
  <div className={className}>
    <div className="text-center p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md mx-auto">
      <div className="mb-4 sm:mb-6">
        <ErrorIcon />
      </div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="w-full sm:w-auto bg-primary-orange hover:bg-primary-orange-hover text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
        >
          Try again
        </button>
      )}
    </div>
  </div>
);

export default ErrorDisplay;
