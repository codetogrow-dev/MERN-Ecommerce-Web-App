import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import AuthenticationNavbar from "../components/AuthenticationNavbar";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosConfiq";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toggleTheme, isDarkMode } = useTheme();
  const label = isDarkMode
    ? "block text-sm font-semibold text-slate-400  mb-2"
    : "block text-sm font-semibold text-gray-600  mb-2";

  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const { data } = await axios.post("user/login", userData);
      const token = data.token;
      JSON.stringify(localStorage.setItem("token", token));
      if (data) {
        toast.success("User logged in Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: `${isDarkMode ? "dark" : "light"}`,
        });
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      if (error.response) {
        console.log(error);
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
    }
  };

  const { mutate } = useMutation(login);

  const handleSubmit = () => {
    const userData = {
      email,
      password,
    };

    mutate(userData);
  };
  const toRegister = () => {
    navigate("/register");
  };
  const toForgetPassword = () => {
    navigate("/forget-password");
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
        <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>

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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleSubmit}
        >
          Login
        </button>
        <div className={"flex items-center justify-between"}>
          <p
            onClick={toRegister}
            className={
              "mt-3 text-blue-600 underline cursor-pointer text-center "
            }
          >
            Don't have an account?Register
          </p>
          <p
            onClick={toForgetPassword}
            className={
              "mt-3 text-blue-600 underline cursor-pointer text-center "
            }
          >
            Forget Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
