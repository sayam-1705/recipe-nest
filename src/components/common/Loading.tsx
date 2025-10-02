import React from "react";

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "text-primary-orange",
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${color} ${className}`}>
      <svg
        className="h-full w-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

const LoadingSection: React.FC<LoadingSectionProps> = ({
  message = "Loading...",
  fullPage = false,
  children,
}) => {
  const containerClasses = fullPage
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        {children || (
          <>
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "text",
  width,
  height,
  animation = "pulse",
}) => {
  const baseClasses = "bg-gray-200";

  const variantClasses = {
    text: "h-4 w-full rounded",
    rectangular: "rounded",
    circular: "rounded-full",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-pulse",
  };

  const styles: React.CSSProperties = {};
  if (width) styles.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    styles.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={styles}
    />
  );
};

export { LoadingSpinner, LoadingSection, Skeleton };
export default LoadingSection;
