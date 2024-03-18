import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { inventoryArray } from "../../utils/CustomData";
import axios from "../../utils/AxiosConfiq";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchData } from "../../api/FetchData";
const AddProduct = () => {
  const [inventory, setInventory] = useState("Pricing");
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const queryClient = useQueryClient();
  const { data: categories } = useQuery(
    "categories",
    () => fetchData("admin/category"),
    {
      refetchOnMount: false,
      staleTime: Infinity,
    }
  );
  const categoryMutation = useMutation(
    async (category) => {
      const { data } = await axios.post("admin/category", {
        name: category,
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
      },
    }
  );
  const handleCategory = async (e) => {
    if (e.key === "Enter" && newCategory.trim() === "") {
      toast.error("Kindle type category and press enter");
      return;
    }
    if (e.key === "Enter" && newCategory.trim() !== "") {
      try {
        const data = await categoryMutation.mutateAsync(newCategory);
        if (data) {
          console.log(data);
          setAddCategory(false);
          toast.success(` ${newCategory} Added to Categories `);
          setNewCategory("");
        }
      } catch (error) {
        toast.error("Network Error");
      }
    }
  };
  return (
    <div
      style={{
        maxHeight: "calc(100vh - 69px)",
      }}
      className="flex flex-1 overflow-y-scroll scroll flex-col bg-[#0F111A] p-4 "
    >
      <div className="my-3 w-full flex sm:flex-row flex-col sm:space-y-0 space-y-4 justify-between">
        <div>
          <p className="text-4xl font-semibold">Add a product</p>
          <p className="text-base font-semibold text-slate-400">
            Orders placed across your store
          </p>
        </div>
        <div className="flex items-end space-x-4 ">
          <button className="border border-slate-400 text-sm font-semibold rounded-md px-5 py-2 hover:bg-slate-600/60 bg-transparent text-slate-300 ">
            Discard
          </button>
          <button className="border border-none text-sm font-semibold rounded-md px-4 py-2 hover:bg-blue-600 bg-blue-500 text-white ">
            Publish Product
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row space-y-4 lg:space-x-4 mt-3">
        <div className="flex flex-col flex-[0.7]">
          <FormInput
            label={"Product Title"}
            labelStyles={"text-2xl"}
            type={"text"}
            id={"product-title"}
            placeholder={"Product Title here.."}
          />
          <div className="w-full ">
            <label
              className="text-2xl font-semibold text-slate-100 "
              htmlFor="product-description"
            >
              Product Description
            </label>
            <textarea
              id="product-description"
              rows={6}
              className="bg-[#141824] mt-3 w-full border border-[#19203591] rounded-lg focus:border-blue-600 outline-none p-3 "
              placeholder="Product Description"
            />
          </div>
          <div className="w-full flex flex-col mt-2 ">
            <label
              className="text-2xl font-semibold text-slate-100 mb-2"
              htmlFor="images"
            >
              Display Images
            </label>
            <input
              required
              type="file"
              className="border border-[#19203591] cursor-pointer focus:border-blue-600 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col flex-1  ">
            <p className={"text-2xl font-semibold text-slate-100 my-4"}>
              Inventory
            </p>
            <div className="flex flex-1 sm:flex-row flex-col border-y border-[#19203591]">
              <div className="flex sm:flex-col  flex-row    flex-[0.3] border-r border-[#19203591]">
                {inventoryArray?.map((item, index) => (
                  <div
                    onClick={() => setInventory(item.title)}
                    className={`flex flex-1 text-sm transition-all duration-300 ease-in-out  items-center justify-center sm:justify-start px-4 py-3 space-x-3 border-b border-[#19203591] cursor-pointer 
                    ${
                      inventory === item?.title
                        ? "text-white bg-slate-600"
                        : "text-slate-300"
                    }
                    `}
                    key={item.title + index}
                  >
                    <i className={`fa-solid ${item.icon}`}></i>
                    <p className="hidden sm:block"> {item.title}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-[0.6] p-4">
                {inventory === "Pricing" && (
                  <div className="flex flex-1 flex-col ">
                    <FormInput
                      label={"Regular Price"}
                      labelStyles={
                        "text-base text-slate-200 font-semibold my-2"
                      }
                      type={"number"}
                      placeholder={"$$$"}
                      id={"regular-price"}
                    />
                    <FormInput
                      label={"Sales Price"}
                      labelStyles={
                        "text-base text-slate-200 font-semibold my-2"
                      }
                      type={"number"}
                      placeholder={"$$$"}
                      id={"sales-price"}
                    />
                  </div>
                )}
                {inventory === "Restock" && (
                  <div className="flex flex-1 flex-col">
                    <FormInput
                      label={"Add To Stock"}
                      labelStyles={
                        "text-base text-slate-200 font-semibold my-2"
                      }
                      type={"number"}
                      placeholder={"$$$"}
                      id={"regular-price"}
                    />
                    <div className="flex justify-center items-center">
                      <Button
                        title={"Confirm"}
                        className={
                          "w-fit   bg-blue-600 hover:bg-blue-600/70 focus:bg-blue-600/90   "
                        }
                      />
                    </div>
                  </div>
                )}
                {inventory === "Shipping" && (
                  <div className="flex flex-1 flex-col justify-between">
                    <p className="font-semibold text-lg">Shipping Type</p>
                    <div className="flex items-start">
                      <input type="radio" className="cursor-pointer my-2" />

                      <div className="text-sm text-slate-400 px-2 ">
                        <p className="text-lg font-normal my-1">
                          Fulfilled by Seller
                        </p>
                        <p>
                          You’ll be responsible for product delivery. <br />
                          Any damage or delay during shipping may cost you a
                          Damage fee.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <input type="radio" className="cursor-pointer my-2" />

                      <div className="text-sm text-slate-400 px-2 ">
                        <p className="text-lg font-normal my-1">
                          Fulfilled by Phoenix
                        </p>
                        <p>
                          Your product, Our responsibility.
                          <br />
                          For a measly fee, we will handle the delivery process
                          for you.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {inventory === "Global Delivery" && (
                  <div>
                    <p className="text-lg font-semibold text-slate-200">
                      Global Delivery
                    </p>
                    <div>
                      <div className="my-2">
                        <input type="radio" className="mr-2" />
                        <label htmlFor="world-wide">World Wide Delivery</label>
                        <p className="text-sm text-slate-400 px-5 my-1 ">
                          Only available with Shipping method:{" "}
                          <span className="underline text-blue-400 cursor-pointer hover:no-underline hover:text-blue-500">
                            Fulfilled by Phoenix
                          </span>
                        </p>
                      </div>
                      <div className="my-2">
                        <input type="radio" className="mr-2 " />
                        <label htmlFor="world-wide">Selected Countries</label>
                        <FormInput
                          placeholder={"Type Country Name"}
                          id={"country-name"}
                        />
                      </div>
                      <div className="my-2">
                        <input type="radio" className="mr-2" />
                        <label htmlFor="world-wide">Local Delivery</label>
                        <p className="text-sm text-slate-400 px-5 my-1 ">
                          Deliver to your country of residence{" "}
                          <span className="underline text-blue-400 cursor-pointer hover:no-underline hover:text-blue-500">
                            Change profile address
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-[0.3]  flex-col h-fit  ">
          <div className="flex flex-1 flex-col h-fit">
            <div className="border border-[#19203591] rounded-lg flex flex-1 flex-col p-4 bg-[#141824] ">
              <p className="text-white text-xl font-semibold mb-4">Organize</p>
              <div className="flex flex-col mb-4">
                <label
                  className="text-base text-slate-200 font-semibold my-2"
                  htmlFor="category"
                >
                  Category
                  <span
                    onClick={() => {
                      setAddCategory(true);
                      setNewCategory("");
                    }}
                    className="text-sm font-semibold cursor-pointer hover:underline text-blue-400 hover:text-blue-500 ml-3"
                  >
                    Add New Category
                  </span>
                </label>
                {addCategory ? (
                  <FormInput
                    value={newCategory}
                    handleChange={(e) => setNewCategory(e.target.value)}
                    type={"text"}
                    placeholder={"Type a category"}
                    className={"mb-0"}
                    onKeyDown={handleCategory}
                  />
                ) : (
                  <select
                    className="bg-slate-800 p-2 rounded-md outline-none focus:border-blue-600 border border-[#19203591] focus:shadow-md focus:shadow-blue-700 cursor-pointer"
                    name="category"
                    id="category"
                    value={newCategory}
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                    }}
                  >
                    <option disabled value="">
                      Select a category
                    </option>
                    {categories?.length !== 0 &&
                      categories?.map((category) => (
                        <option key={category?._id} value={category?.name}>
                          {category?.name?.charAt(0).toUpperCase() +
                            category?.name?.slice(1)}
                        </option>
                      ))}
                  </select>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <label
                  className="text-base text-slate-200 font-semibold my-2"
                  htmlFor="category"
                >
                  Vendor
                </label>
                <select
                  className="bg-slate-800 p-2 rounded-md outline-none focus:border-blue-600 border border-[#19203591] focus:shadow-md focus:shadow-blue-700"
                  name="category"
                  id="category"
                >
                  <option value="men">Mens's Category</option>
                  <option value="women"> Women's Category</option>
                  <option value="kids">Kids's Category</option>
                </select>
              </div>
              <FormInput
                type={"text"}
                id={"collection"}
                labelStyles={"text-base text-slate-200 font-semibold my-2"}
                placeholder={"Collection"}
                label={"Collection"}
              />
              <div className="flex flex-col ">
                <label
                  className="text-base text-slate-200 font-semibold my-2"
                  htmlFor="category"
                >
                  Tags
                </label>
                <select
                  className="bg-slate-800 p-2 rounded-md outline-none focus:border-blue-600 border border-[#19203591] focus:shadow-md focus:shadow-blue-700"
                  name="category"
                  id="category"
                >
                  <option value="men">Mens's Category</option>
                  <option value="women"> Women's Category</option>
                  <option value="kids">Kids's Category</option>
                </select>
              </div>
              <FormInput
                type={"number"}
                id={"offer"}
                labelStyles={"text-base text-slate-200 font-semibold my-4"}
                placeholder={"Offer"}
                label={"Offer"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
