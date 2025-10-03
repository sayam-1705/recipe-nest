import React from "react";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Something went wrong",
  message,
  actionLabel = "Try again",
  onAction,
  variant = "error",
  className = "",
}) => {
  const variantClasses = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconColor = {
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  const buttonColor = {
    error: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    warning: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
    info: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  };

  const Icon = () => {
    if (variant === "warning") {
      return (
        <svg
          className="h-6 w-6"
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
    }

    if (variant === "info") {
      return (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    }

    return (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  };

  return (
    <div
      className={`rounded-lg border p-4 sm:p-6 ${variantClasses[variant]} ${className}`}
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 ${iconColor[variant]} mt-0.5`}>
          <Icon />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold leading-tight">
            {title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm opacity-90 leading-relaxed break-words">
            {message}
          </p>
          {onAction && (
            <div className="mt-3 sm:mt-4">
              <button
                onClick={onAction}
                className={`w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonColor[variant]}`}
              >
                {actionLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NotFound: React.FC<NotFoundProps> = ({
  title = "404 - Page Not Found",
  message = "The page you are looking for does not exist.",
  actionLabel = "Go Home",
  onAction,
  showHome = true,
}) => {
  const handleGoHome = () => {
    if (onAction) {
      onAction();
    } else if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="text-center p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md mx-auto">
        <div className="mb-4 sm:mb-6">
          <svg
            className="mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
          {message}
        </p>
        {showHome && (
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto bg-primary-orange hover:bg-primary-orange-hover text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export { ErrorMessage, NotFound };
export default ErrorMessage;
