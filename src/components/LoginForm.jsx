import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link } from "react-router-dom";


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/login",
        data
      );
      const token = response?.data?.data?.token;
      if (token) {
        Cookies.set("token", token, { expires: 7 });
        toast.success("Login successful!");
        navigate("/view-courses"); 
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.status_message || "Something went wrong.");
        console.error("Login error:", error.response);
      } else {
        toast.error("Network error. Please check your connection.");
        console.error("Network error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-gray-600 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-gray-600 font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className={`w-full mt-2 px-4 py-2 border rounded-md focus:outline-none focus:border-2 focus:border-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span
                className="absolute bottom-1 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-600" />
                ) : (
                  <FaEye className="text-gray-600" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 absolute">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 text-white rounded-md focus:outline-none ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Login"}
          </button>
         <div className="w-full flex justify-center text-blue-500 hover:underline hover:underline-offset-2">
         <Link to={'/registration'}>Don't have an account? Signup</Link>
         </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
