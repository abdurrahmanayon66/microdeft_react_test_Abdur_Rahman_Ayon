import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CourseRegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
      }
      const response = await axios.post(
        "https://react-interview.crd4lc.easypanel.host/api/course",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course registration successful!");
      reset();
      setTimeout(() => {
        navigate("/view-courses");
      }, 3000);
    } catch (error) {
      toast.error("Error registering course. Please try again.");
      console.log("Error registering course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <ToastContainer />
      <div className="bg-white px-4 py-8 lg:px-8 lg:py-8 rounded-lg shadow-lg w-full sm:w-11/12 lg:w-8/12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Course Registration
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-600 font-semibold lg:text-base text-sm"
              >
                Course Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter course title"
                className={`w-full mt-2 px-4 py-2 border lg:text-base text-sm rounded-md focus:outline-none focus:border-2 focus:border-blue-500 ${
                  errors.title ? "border-red-500" : ""
                }`}
                {...register("title", { required: "Course title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="badge_text"
                className="block text-gray-600 font-semibold lg:text-base text-sm"
              >
                Badge Text
              </label>
              <input
                id="badge_text"
                name="badge_text"
                type="text"
                placeholder="Enter badge text"
                className={`w-full mt-2 px-4 py-2 lg:text-base text-sm border rounded-md focus:outline-none focus:border-2 focus:border-blue-500 ${
                  errors.badge_text ? "border-red-500" : ""
                }`}
                {...register("badge_text", {
                  required: "Badge text is required",
                })}
              />
              {errors.badge_text && (
                <p className="text-red-500 text-sm">
                  {errors.badge_text.message}
                </p>
              )}
            </div> 

            <div>
              <label
                htmlFor="badge_color"
                className="block text-gray-600 font-semibold lg:text-base text-sm"
              >
                Badge Color
              </label>
              <input
                id="badge_color"
                name="badge_color"
                type="text"
                placeholder="Enter badge color (e.g., red or #ff0000)"
                className={`w-full mt-2 px-4 py-2 lg:text-base text-sm border rounded-md focus:outline-none focus:border-2 focus:border-blue-500 ${
                  errors.badge_color ? "border-red-500" : ""
                }`}
                {...register("badge_color", {
                  required: "Badge color is required",
                  setValueAs: (value) => value.toLowerCase(),
                })}
              />
              {errors.badge_color && (
                <p className="text-red-500 text-sm">
                  {errors.badge_color.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="instructor_name"
                className="block text-gray-600 font-semibold lg:text-base text-sm"
              >
                Instructor Name
              </label>
              <input
                id="instructor_name"
                name="instructor_name"
                type="text"
                placeholder="Enter instructor's name"
                className={`w-full mt-2 px-4 py-2 lg:text-base text-sm border rounded-md focus:outline-none focus:border-2 focus:border-blue-500 ${
                  errors.instructor_name ? "border-red-500" : ""
                }`}
                {...register("instructor_name", {
                  required: "Instructor name is required",
                })}
              />
              {errors.instructor_name && (
                <p className="text-red-500 text-sm">
                  {errors.instructor_name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-600 font-semibold lg:text-base text-sm"
              >
                Course Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter course description"
                rows="10"
                className={`w-full mt-2 px-4 py-2 lg:text-base text-sm border rounded-md focus:outline-none focus:border-2 focus:border-blue-500 ${
                  errors.description ? "border-red-500" : ""
                }`}
                {...register("description", {
                  required: "Course description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2 mt-2 flex justify-center">
            <button
              type="submit"
              className={`w-[200px] py-2 text-white rounded-md focus:outline-none ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseRegistrationForm;
