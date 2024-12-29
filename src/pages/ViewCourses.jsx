import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import CourseCard from "../components/CourseCard";
import image from '../assets/images/image.jpg';
import { FiPlusCircle } from "react-icons/fi";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://react-interview.crd4lc.easypanel.host/api/course",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(response?.data?.data?.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 lg:px-16 px-4 py-8">
      <h1 className="text-2xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
        Available Courses
      </h1>
      <div className="flex justify-end mb-4 lg:mb-10">
        <Link className="px-2 py-2 lg:text-base text-sm bg-blue-500 text-white rounded-md flex items-center gap-x-2" to={'/create-course'}><FiPlusCircle className="text-lg"/> Create New Course</Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-10 gap-y-10">
        {courses.map((course, index) => (
          <CourseCard
           course={course}
            image={image}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewCourses;
