import React, { useState } from "react";
import { useTheme } from "../../../client/src/context/ThemeContext";
import AuthenticationNavbar from "../../../client/src/components/AuthenticationNavbar";
import axios from "../utils/AxiosConfiq";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const label = isDarkMode
    ? "block text-sm font-semibold text-slate-400 mb-2"
    : "block text-sm font-semibold text-gray-600 mb-2";

  const navigate = useNavigate();
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const postDetails = (pic) => {
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "ecommerce-app");
      data.append("cloud_name", "dtptl3jmj");
      fetch("https://api.cloudinary.com/v1_1/dtptl3jmj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicture(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const register = async (userData) => {
    try {
      const { data } = await axios.post("user/signup", userData);

      const token = data.token;
      JSON.stringify(localStorage.setItem("token", token));
      if (data) {
        toast.success("User logged in Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: `${isDarkMode ? "dark" : "light"}`,
        });

        setFullName("");
        setUserName("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${isDarkMode ? "dark" : "light"}`,
      });
    }
  };
  const { mutate } = useMutation(register);

  const handleSubmit = () => {
    const userData = {
      fullname,
      username,
      email,
      password,
      picture,
      isAdmin,
    };
    mutate(userData);
  };

  const toLogin = () => {
    navigate("/");
  };
  return (
    <div
      className={`w-full min-h-screen  ${
        isDarkMode ? "bg-slate-800 text-white " : "bg-white text-black"
      }`}
    >
      <AuthenticationNavbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      <div
        className={` max-w-md lg:max-w-lg xl:max-w-xl mx-auto mt-8 p-6 ${
          isDarkMode
            ? "bg-slate-700 shadow-slate-800 text-white shadow-md"
            : "bg-white text-black shadow-slate-400 shadow-xl"
        }  rounded-md   `}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className={`${label}`} htmlFor="fullname">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={fullname}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className={`${label}`} htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 text-black font-semibold py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className={`${label}`} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className={`${label}`} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className={`${label}`} htmlFor="picture">
            Profile Picture
          </label>
          <input
            type="file"
            id="picture"
            accept="image/*"
            onChange={(e) => {
              postDetails(e.target.files[0]);
            }}
            className={`w-full focus:outline-none border py-2 px-1 rounded-md focus:border-blue-500 bg-white text-gray-600 text-sm font-semibold `}
          />
        </div>
        <div className="mb-4">
          <label className={`${label}`}>Role</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value={true}
                className="form-radio cursor-pointer"
                onChange={(e) => setIsAdmin(e.target.value)}
              />
              <span className="ml-2">Admin</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="role"
                value={false}
                className="form-radio cursor-pointer"
                onChange={(e) => setIsAdmin(e.target.value)}
              />
              <span className="ml-2">Customer</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        <p
          onClick={toLogin}
          className={"mt-3 text-blue-600 underline cursor-pointer text-center "}
        >
          Already have an account?Login
        </p>
      </div>
    </div>
  );
};

export default Register;
