import React from "react";

interface ExtendedInputProps extends InputProps {
  icon?: React.ComponentType<{ className?: string }> | string;
  charCount?: number;
  maxChars?: number;
}

const Input: React.FC<ExtendedInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  containerClassName = "",
  disabled = false,
  required = false,
  min,
  max,
  name,
  icon,
  charCount,
  maxChars,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue =
      type === "number" ? parseInt(e.target.value) || 0 : e.target.value;
    onChange(newValue);
  };

  const isTextArea = type === "textarea";

  return (
    <div className={`group space-y-2 ${containerClassName}`}>
      <label
        htmlFor={name}
        className="block text-xs font-bold text-gray-600 dark:text-gray-400 ml-1 uppercase tracking-wider transition-colors group-focus-within:text-primary-stitch"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {typeof icon === "string" ? (
              <span className="text-gray-400 text-xl">{icon}</span>
            ) : (
              React.createElement(icon as React.ComponentType<{ className?: string }>, {
                className: "w-5 h-5 text-gray-400 group-focus-within:text-primary-stitch transition-colors",
              })
            )}
          </div>
        )}
        
        {isTextArea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={4}
            className={`glass-input w-full rounded-2xl p-4 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 focus:outline-none resize-none leading-relaxed text-base min-h-[120px] ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            } ${className}`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            min={min}
            max={max}
            className={`glass-input w-full rounded-2xl py-4 pr-4 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 focus:outline-none ${
              icon ? "pl-12" : "pl-4"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
          />
        )}

        {(charCount !== undefined && maxChars !== undefined) && (
          <div className="absolute bottom-3 right-3">
            <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {charCount}/{maxChars}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
