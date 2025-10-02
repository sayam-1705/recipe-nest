import React from "react";

const Input: React.FC<InputProps> = ({
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
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === "number" ? parseInt(e.target.value) || 0 : e.target.value;
    onChange(newValue);
  };

  return (
    <div
      className={`space-y-3 transform transition-all duration-300 ease-out ${containerClassName}`}
    >
      <label htmlFor={name} className="block text-sm font-semibold text-neutral-700 uppercase tracking-wide transition-colors duration-200 hover:text-primary-orange">
        {label}
        {required && <span className="text-red-500 ml-1 animate-pulse">*</span>}
      </label>
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
        className={`w-full px-4 py-4 rounded-xl border-2 border-neutral-200 focus:outline-none focus:ring-0 focus:border-primary-orange focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-primary-orange-light hover:shadow-md bg-neutral-white shadow-sm transform active:border-primary-orange active:outline-none ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-text hover:bg-primary-orange-bg"
        } ${className}`}
      />
    </div>
  );
};

export default Input;
