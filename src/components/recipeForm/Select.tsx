import React from "react";

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

  const normalizedOptions: SelectOption[] = options.map((option) => {
    if (typeof option === "string") {
      return { value: option, label: option };
    }
    return option;
  });

  const DropdownIcon = () => (
    <svg
      className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ease-out pointer-events-none ${
        disabled
          ? "text-neutral-300"
          : "text-neutral-500 group-hover:text-primary-orange"
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
      className={`space-y-2 sm:space-y-3 transform transition-all duration-300 ease-out ${containerClassName}`}
    >
      <label
        htmlFor={name}
        className="block text-xs sm:text-sm font-semibold text-neutral-700 uppercase tracking-wide transition-colors duration-200 hover:text-primary-orange"
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
          className={`w-full px-3 sm:px-4 py-3 sm:py-4 pr-10 sm:pr-12 text-sm sm:text-base rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-0 focus:border-primary-orange focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-primary-orange-light hover:shadow-md bg-neutral-white shadow-sm transform appearance-none active:border-primary-orange active:outline-none ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-primary-orange-bg"
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
