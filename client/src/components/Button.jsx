import React from "react";

const Button = ({ title, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} px-3 py-2 text-sm font-semibold  rounded-md  transition `}
    >
      {title}
    </button>
  );
};

export default Button;
