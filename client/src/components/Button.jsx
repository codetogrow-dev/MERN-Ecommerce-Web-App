import React from "react";
import Spinner from "./Spinner";

const Button = ({ title, className, onClick, loading, type, loadingColor }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} px-3 py-2 text-sm font-semibold  rounded-md  transition `}
    >
      {loading ? <Spinner loadingColor={loadingColor} /> : title}
    </button>
  );
};

export default Button;
