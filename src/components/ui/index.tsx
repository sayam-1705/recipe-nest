import React from "react";

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}) => {
  const baseClasses =
    "px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-primary-orange hover:bg-primary-orange-dark text-white focus:ring-primary-orange",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
  };

  const disabledClasses =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-1 sm:gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="hidden sm:inline">Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export const Input: React.FC<{
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  error,
  className = "",
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-primary-orange ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}> = ({ children, className = "", padding = "md" }) => {
  const paddingClasses = {
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-xs sm:max-w-md w-full max-h-[90vh] overflow-y-auto">
        {title && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{title}</h2>
          </div>
        )}
        <div className="px-4 sm:px-6 py-3 sm:py-4">{children}</div>
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex justify-end">
          <Button onClick={onClose} variant="secondary" className="text-sm">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-3 h-3 sm:w-4 sm:h-4",
    md: "w-6 h-6 sm:w-8 sm:h-8",
    lg: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-gray-200 border-t-primary-orange rounded-full animate-spin`}
    />
  );
};

export const EmptyState: React.FC<{
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}> = ({ title, description, action }) => {
  return (
    <div className="text-center py-8 sm:py-12 px-4">
      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 leading-tight">{title}</h3>
      {description && <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{description}</p>}
      {action && (
        <Button onClick={action.onClick} variant="primary" className="w-full sm:w-auto">
          {action.label}
        </Button>
      )}
    </div>
  );
};
