import React from "react";
import Navbar from "../components/Navbar";
import CustomerRoutes from "../components/CustomerRoutes";
import { Outlet } from "react-router-dom";
const CustomerLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen text-white bg-slate-800">
      <div className="sticky top-0 ">
        <Navbar />
        <CustomerRoutes />
      </div>
      <div className="flex flex-1 ">{<Outlet />}</div>
    </div>
  );
};

export default CustomerLayout;
