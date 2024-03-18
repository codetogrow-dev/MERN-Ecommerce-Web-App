import React from "react";
import { useUser } from "../context/UserContext";
const Navbar = ({ openModel, setOpenModel }) => {
  const { user } = useUser();

  return (
    <div className=" flex min-w-full justify-between items-center py-3 border-b border-slate-700/20 ">
      <div className="flex  flex-[0.4] lg:flex-[0.3] items-center space-x-3 lg:space-x-0 justify-around lg:justify-center">
        <i
          onClick={() => setOpenModel(!openModel)}
          className="fa-solid fa-bars text-2xl block lg:hidden  text-slate-300  font-semibold"
        ></i>
        <p className="text-center text-4xl font-bold ">BuyIt</p>
      </div>
      <div className=" hidden lg:flex flex-[0.4] items-center rounded-md  justify-center border border-slate-600 outline-none focus:border-blue-600   ">
        <i className="fa-solid fa-magnifying-glass p-[13px] bg-slate-600"></i>
        <input
          className="bg-transparent focus:border-blue-600 border focus:shadow-blue-600 shadow-sm border-transparent rounded-r-md  w-full p-2 outline-none  "
          type="search"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center flex-[0.4] lg:flex-[0.2] justify-around">
        <i className="fa-solid fa-moon text-xl cursor-pointer"></i>
        <i className="fa-solid fa-bell text-xl cursor-pointer"></i>
        <i className="fa-solid fa-list-ul text-xl cursor-pointer"></i>
        <img
          className="w-10 h-10 object-cover rounded-full"
          src={user?.user?.picture}
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
