import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utils/AxiosConfiq";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const ProductCard = ({
  picture,
  title,
  regularPrice,
  salesPrice,
  productId,
}) => {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addToWishlistMutation = useMutation(
    async (productId) => {
      try {
        const data = await axiosInstance.post(`customer/wishlist/${productId}`);
        if (data) {
          console.log(data);
          toast.success("Product Added to Wishlist");
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries("wishlists");
      },
    }
  );
  const handleWishList = async () => {
    if (clicked) {
      await addToWishlistMutation.mutateAsync(productId);
    }
  };
  return (
    <div className="relative flex flex-col items-center sm:w-full">
      <img
        className="object-contain w-full transition-all duration-300 ease-in-out border rounded-lg hover:scale-95 hover:shadow-xl hover:shadow-slate-800/20 bg-slate-700/10 border-slate-700/50"
        src={picture}
        alt="image"
      />
      <p
        onClick={() => navigate(`/customer/product-detail/${productId}`)}
        className="my-2 text-sm transition-all duration-300 ease-in-out cursor-pointer text-slate-100 hover:underline hover:text-blue-500 text-start"
      >
        {title.split(" ").slice(0, 8).join(" ")}...
      </p>
      <div className="flex justify-around w-full">
        <div className="flex items-center justify-start">
          {Array.from({ length: 5 }).map((_, index) => (
            <i
              key={index}
              className="fa-solid mx-[1px] fa-star text-yellow-500 text-sm"
            ></i>
          ))}
        </div>
        <span className="text-[14px] mx-1 text-slate-300 font-semibold ">{`(74 people rated)`}</span>
      </div>
      <div
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
        onClick={() => {
          setClicked(!clicked);
          handleWishList();
        }}
        className={`border transition-all duration-300 ease-in-out border-blue-600 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer text-sm absolute top-2 right-2
            ${
              mouseEntered || clicked
                ? "bg-blue-500 shadow-xl shadow-blue-400 "
                : "bg-transparent"
            }       
        `}
      >
        {mouseEntered || clicked ? (
          <i className={`fa-solid fa-heart text-white `}></i>
        ) : (
          <i className="text-blue-600 fa-regular fa-heart"></i>
        )}
      </div>
      <div className="flex items-center justify-around w-full my-2">
        <del className="text-lg font-medium text-slate-400">
          ${regularPrice}.00
        </del>
        &nbsp;
        <span className="text-3xl font-semibold">${salesPrice}.00</span>
      </div>
    </div>
  );
};

export default ProductCard;
