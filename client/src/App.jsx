import Register from "../../client/src/pages/Register";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tooltip/dist/react-tooltip.css";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./context/ThemeContext";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from "react-loading-skeleton";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminLayout from "./layouts/AdminLayout";
import CustomerHome from "./pages/customers/CustomerHome";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import AllCustomers from "./pages/admin/AllCustomers";
import AllOrders from "./pages/admin/AllOrders";
function App() {
  const { isDarkMode } = useTheme();
  return (
    <>
      <SkeletonTheme
        baseColor={` ${isDarkMode ? "#94A3B8" : "#E2E8F0"} `}
        highlightColor={` ${isDarkMode ? "#E2E8F0" : "#94A3B8"} `}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="customers" element={<AllCustomers />} />
            <Route path="orders" element={<AllOrders />} />
          </Route>
          <Route path="/customer" element={<CustomerHome />} />
        </Routes>
      </SkeletonTheme>
      <ToastContainer />
      <Toaster />
    </>
  );
}

export default App;
