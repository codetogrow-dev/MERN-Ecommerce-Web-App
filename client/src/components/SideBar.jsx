import React from "react";
import AdminRoute from "./AdminRoute";
import { useNavigate, useLocation } from "react-router-dom";
const SideBar = ({ className, setOpenModel, handleCollapse, collapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminSideBarRoutes = [
    {
      icon: "fa-house",
      text: "Dashboard",
      route: "/admin/dashboard",
    },
    {
      icon: "fa-briefcase",
      text: "Add Product",
      route: "/admin/add-product",
    },
    {
      icon: "fa-user",
      text: "Customers",
      route: "/admin/customers",
    },
    {
      icon: "fa-vector-square",
      text: "Orders",
      route: "/admin/orders",
    },
  ];
  return (
    <div
      className={` ${className} flex flex-1 flex-col  py-2  border-r border-[#19203591]`}
    >
      <div className="flex flex-[0.92] flex-col justify-around  space-y-3  items-baseline">
        {adminSideBarRoutes?.map((item, index) => (
          <AdminRoute
            collapse={collapse}
            key={index + item.route}
            icon={item?.icon}
            text={item?.text}
            handleClick={() => {
              navigate(item.route);
              setOpenModel && setOpenModel(false);
            }}
            className={`${
              location.pathname === item.route
                ? "bg-slate-600/70 text-white"
                : "bg-slate-600/20 text-slate-400"
            }`}
          />
        ))}
      </div>
      <div
        onClick={handleCollapse}
        className="flex flex-[0.08] items-center w-full justify-center border-t border-slate-800 cursor-pointer"
      >
        <i
          className={`fa-solid ${
            collapse ? "fa-arrow-right-long" : "fa-arrow-left-long"
          } mr-2 text-lg`}
        ></i>
        <p className={`text-lg ${collapse ? "hidden" : "block"}`}>
          Collapse View
        </p>
      </div>
    </div>
  );
};

export default SideBar;
