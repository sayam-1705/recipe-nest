import React from "react";

interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "text" | "number" | "email" | "password" | "url" | "tel";
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  name?: string;
}

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
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 uppercase tracking-wide transition-colors duration-200 hover:text-orange-600">
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
        className={`w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-orange-500 focus:shadow-none outline-none transition-all duration-300 ease-out hover:border-orange-300 hover:shadow-md bg-white shadow-sm transform active:border-orange-500 active:outline-none ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-text hover:bg-orange-50/30"
        } ${className}`}
      />
    </div>
  );
};

export default Input;
