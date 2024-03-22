import React from "react";
import gif from "../assets/output-onlinegiftools.gif";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col space-y-1 bg-slate-800 justify-center items-center text-white ">
      <p>404 | Page Not Found</p>
      <img className="" src={gif} alt="" />

      <Button
        title={"Go Back"}
        className={
          "bg-blue-600 px-4 font-semibold hover:bg-blue-600/90 py-2 hover:scale-95"
        }
        onClick={() => navigate(-1)}
      />
    </div>
  );
};

export default NotFound;
