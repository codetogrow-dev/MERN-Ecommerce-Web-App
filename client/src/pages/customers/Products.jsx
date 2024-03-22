import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/FetchData";
import { useQuery } from "react-query";
import ProductsFilter from "../../components/ProductsFilter";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";
import ProductCardSkeleton from "../../skeleton/ProductCardSkeleton";
const Products = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data, isLoading } = useQuery(
    "all-products",
    () => fetchData("customer/products"),
    {
      refetchOnMount: false,
      staleTime: 30000,
    }
  );

  return (
    <div
      style={{
        height: "calc(100vh - 115px)",
      }}
      className="relative flex flex-col flex-1 p-2 space-y-3 overflow-x-hidden overflow-y-scroll scroll lg:flex-row lg:space-x-3 lg:p-3 "
    >
      <div
        onClick={() => setOpenDrawer(true)}
        className="border rounded-md cursor-pointer border-slate-700 w-fit lg:hidden"
      >
        <p className="px-3 py-1">Filters</p>
      </div>
      <div className="border border-slate-700 p-2 h-fit  hidden   lg:flex w-[15rem]">
        <ProductsFilter />
      </div>
      <div className="flex flex-1 duration-300 ease-in-out translate-all lg:flex-1 ">
        <div className="grid w-full justify-items-center ms:grid-cols- sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            <>
              {data?.map((product) => (
                <ProductCard
                  key={product?._id}
                  title={product?.title}
                  picture={product?.picture}
                  salesPrice={product?.salesPrice}
                  regularPrice={product?.regularPrice}
                  productId={product?._id}
                  handleWishList={() => handleWishList(product?._id)}
                />
              ))}
            </>
          )}
        </div>
        {openDrawer && (
          <div
            style={{
              height: "calc(100vh - 115px)",
            }}
            className="border-r border-slate-700  absolute  overflow-y-scroll scroll  lg:hidden  top-0 left-0 bg-slate-700  w-[15rem]"
          >
            <ProductsFilter
              // openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
