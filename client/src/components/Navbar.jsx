import React from "react";
import { useUser } from "../context/UserContext";
const Navbar = ({ openModel, setOpenModel }) => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between min-w-full py-3 border-b border-slate-700/20">
      <div className="flex  flex-[0.4] lg:flex-[0.3] items-center space-x-3 lg:space-x-0 justify-around lg:justify-center">
        <i
          onClick={() => setOpenModel(!openModel)}
          className="block text-2xl font-semibold fa-solid fa-bars lg:hidden text-slate-300"
        ></i>
        <p className="text-4xl font-bold text-center ">BuyIt</p>
      </div>
      <div className=" hidden lg:flex flex-[0.4] items-center rounded-md  justify-center border border-slate-600 outline-none focus:border-blue-600   ">
        <i className="fa-solid fa-magnifying-glass p-[13px] bg-slate-600"></i>
        <input
          className="w-full p-2 bg-transparent border border-transparent shadow-sm outline-none focus:border-blue-600 focus:shadow-blue-600 rounded-r-md "
          type="search"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center flex-[0.4] lg:flex-[0.2] justify-around">
        <i className="text-xl cursor-pointer fa-solid fa-moon"></i>
        <i className="text-xl cursor-pointer fa-solid fa-bell"></i>
        <i className="text-xl cursor-pointer fa-solid fa-list-ul"></i>
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={user?.user?.picture}
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
