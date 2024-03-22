import React from "react";
import ToolTip from "./ToolTip";
const AdminRoute = ({ icon, text, handleClick, className, collapse }) => {
  return (
    <div
      onClick={handleClick}
      className={`flex w-full cursor cursor-pointer transition-all duration-300 ease-in-out justify-center ${className} items-baseline  py-3 h-fit  `}
    >
      {collapse ? (
        <ToolTip tooltip={text}>
          <button className="bg-transparent text-white  rounded">
            <i className={`fa-solid ${icon} mr-2 `}></i>
          </button>
        </ToolTip>
      ) : (
        <>
          <i className={`fa-solid ${icon} mr-2 `}></i>
          <p
            className={`text-lg transition-all duration-300 whitespace-nowrap  ${
              collapse ? "hidden" : "block"
            } `}
          >
            {text}
          </p>
        </>
      )}
    </div>
  );
};

export default AdminRoute;
