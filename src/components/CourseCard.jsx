import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import '../stylesheet/CourseCard.css';

const CourseCard = ({ course, image }) => {
  return (
    <div className="course-card">
      <div className="image-container">
        <div
          className="badge"
          style={{ backgroundColor: course?.badge_color }}
        >
          {course?.badge_text}
        </div>
        <img
          className="course-image"
          src={image}
          alt={course?.title}
        />
      </div>
      <div className="course-content">
        <h3 className="course-title line-clamp-1">{course?.title}</h3>
        <p className="course-description line-clamp-2">{course?.description}</p>
        <div className="instructor-info">
          <FaUserGraduate className="instructor-icon" />
          <span className="instructor-name line-clamp-1">{course?.instructor_name}</span>
        </div>
      </div>
      <div className="button-container">
        <button className="view-detail-button">
          View Detail <BsFillInfoCircleFill />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
