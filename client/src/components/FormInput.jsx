import React from "react";
import { useTheme } from "../context/ThemeContext";
const FormInput = ({
  label,
  placeholder,
  id,
  type,
  value,
  handleChange,
  labelStyles,
  className,
  onKeyDown,
}) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`mb-4 w-full ${className} `}>
      <label
        className={`${
          isDarkMode
            ? "block font-semibold text-slate-100 mb-2"
            : "block font-semibold text-gray-600 mb-2"
        } ${labelStyles} `}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        className="w-full px-4 bg-[#141824]  border-[#21283a91]  py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        required
      />
    </div>
  );
};

export default FormInput;
