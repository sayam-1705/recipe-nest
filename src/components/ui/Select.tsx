import React from "react";
import { ChevronDown } from "lucide-react";

interface ExtendedSelectProps extends SelectProps {
  icon?: React.ComponentType<{ className?: string }> | string;
}

const Select: React.FC<ExtendedSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  containerClassName = "",
  disabled = false,
  required = false,
  name,
  icon,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const normalizedOptions: SelectOption[] = options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    return option;
  });

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
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={`glass-input w-full rounded-2xl py-4 pr-10 text-gray-900 dark:text-white appearance-none cursor-pointer focus:ring-0 focus:outline-none ${
            icon ? "pl-12" : "pl-4"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        >
          <option value="">{placeholder}</option>
          {normalizedOptions.map((option, index) => (
            <option key={option.value || index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400 group-focus-within:text-primary-stitch transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Select;
