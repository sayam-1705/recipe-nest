import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[] | string[];
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

const Select: React.FC<SelectProps> = ({
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
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  // Convert string array to SelectOption array if needed
  const normalizedOptions: SelectOption[] = options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    return option;
  });

  // Custom dropdown icon component
  const DropdownIcon = () => (
    <svg
      className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ease-out pointer-events-none ${
        disabled ? "text-gray-300" : "text-gray-500 group-hover:text-orange-500"
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <div
      className={`space-y-3 transform transition-all duration-300 ease-out ${containerClassName}`}
    >
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 uppercase tracking-wide transition-colors duration-200 hover:text-orange-600"
      >
        {label}
        {required && <span className="text-red-500 ml-1 animate-pulse">*</span>}
      </label>
      <div className="relative group">
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={`w-full px-4 py-4 pr-12 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-orange-500 focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-orange-300 hover:shadow-md bg-white shadow-sm transform appearance-none active:border-orange-500 active:outline-none ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-orange-50/30"
          } ${className}`}
        >
          <option value="">{placeholder}</option>
          {normalizedOptions.map((option, index) => (
            <option key={option.value || index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <DropdownIcon />
      </div>
    </div>
  );
};

export default Select;
