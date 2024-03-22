import React from "react";
import { CUSTOMER_ROUTES as routes } from "../utils/CustomData";
import { useNavigate, useLocation } from "react-router-dom";
const CustomerRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-y border-slate-700 bg-slate-700">
      <div className="flex flex-[0.2] justify-center text-lg font-semibold">
        Customer
      </div>
      <div className="flex flex-[0.6] items-center justify-between text-sm font-semibold">
        {routes?.map((route, index) => (
          <p
            onClick={() => navigate(route.navigate)}
            className={`cursor-pointer hover:text-blue-600 transition-all duration-300 ease-in-out
            ${
              location.pathname === route.navigate
                ? "text-blue-600"
                : "text-slate-300"
            }
            `}
            key={route + index}
          >
            {route?.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CustomerRoutes;
