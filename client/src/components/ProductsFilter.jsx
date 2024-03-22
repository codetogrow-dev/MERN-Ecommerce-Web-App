import React from "react";
import { useQuery } from "react-query";
import { fetchData } from "../api/FetchData";
import { useState } from "react";

const ProductsFilter = ({ openDrawer, setOpenDrawer }) => {
  const [expand, setExpand] = useState(true);
  const handleClose = () => {
    setOpenDrawer(false);
  };
  const { data } = useQuery("categories", () => fetchData("admin/category"), {
    staleTime: 30000,
  });
  return (
    <div className="flex justify-end w-full p-1 h-fit">
      <div
        onClick={handleClose}
        className="flex items-center justify-center w-8 h-8 border-2 rounded-full cursor-pointer lg:hidden"
      >
        <i className="text-lg fa-solid fa-xmark"></i>
      </div>
      <div className="w-full">
        <div
          onClick={() => setExpand(!expand)}
          className="flex items-center justify-between w-full"
        >
          <p className="my-2 text-xl font-semibold">Categories</p>
          <i
            className={`fa-solid ${expand ? "fa-angle-up" : "fa-angle-down"}`}
          ></i>
        </div>
        <div>
          {expand && (
            <div className="bg-slate-700">
              {" "}
              {data?.map((category) => (
                <div
                  className="flex items-center space-x-2"
                  key={category?._id}
                >
                  <input type="checkbox" className="cursor-pointer " />
                  <p>{category?.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          onClick={() => setExpand(!expand)}
          className="flex items-center justify-between w-full"
        >
          <p className="my-2 text-xl font-semibold">Categories</p>
          <i
            className={`fa-solid ${expand ? "fa-angle-up" : "fa-angle-down"}`}
          ></i>
        </div>
        <div>
          {expand && (
            <div className="bg-slate-700">
              {data?.map((category) => (
                <div
                  className="flex items-center space-x-2"
                  key={category?._id}
                >
                  <input type="checkbox" className="cursor-pointer " />
                  <p>{category?.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
