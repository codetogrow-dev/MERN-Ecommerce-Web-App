import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [openModel, setOpenModel] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [chatClicked, setChatClicked] = useState(true);
  const handleCollapse = () => {
    setCollapse(!collapse);
    if (collapse) {
      console.log("collapse");
    }
  };
  return (
    <div className="text-white relative flex flex-col w-full min-h-screen bg-[#141824]   overflow-scroll no-scroll   ">
      <Navbar openModel={openModel} setOpenModel={setOpenModel} />
      <div className={`flex flex-1`}>
        <div
          className={`hidden lg:flex  ${
            collapse ? "flex-[0.04]" : "xl:flex-[0.17] flex-[0.2]"
          }`}
        >
          <SideBar handleCollapse={handleCollapse} collapse={collapse} />
        </div>

        <div
          style={{
            height: `${openModel ? "calc(100vh - 66px)" : "0px"}`,

            transform: "-translate-x-32",
            transition: "all .3s ease-linear",
          }}
          className={`absolute  flex flex-1 lg:hidden top-16 bg-slate-700 w-[15rem] text-white`}
        >
          {openModel && <SideBar setOpenModel={setOpenModel} />}
        </div>

        <div className="flex flex-1 ">{<Outlet />}</div>
      </div>
      <div
        onClick={() => setChatClicked(!chatClicked)}
        className="absolute bottom-2 lg:bottom-10 right-2 sm:right-4 lg:right-12  "
      >
        {chatClicked ? (
          <div className="border cursor-pointer transition-all duration-300 ease-in-out border-slate-800 rounded-full px-5 py-2 bg-slate-700 flex items-center">
            <p className="text-xl font-semibold text-blue-500">
              Chat Customers
            </p>
            <i className="fa-regular fa-circle-dot text-green-500 text-sm ml-3 animate-ping"></i>
          </div>
        ) : (
          <div className="border transition-all duration-300 ease-in-out border-slate-800 rounded-full px-[0.8rem] cursor-pointer py-2 flex justify-center items-center">
            <i className="fa-solid fa-angle-down text-2xl text-blue-500"></i>
          </div>
        )}
      </div>
      {!chatClicked && (
        <div className="absolute bottom-16 lg:bottom-24 right-3 lg:right-20   h-[77vh] w-[23rem]  border  border-transparent rounded-md shadow-4xl bg-slate-800 "></div>
      )}
    </div>
  );
};
//

export default AdminLayout;
