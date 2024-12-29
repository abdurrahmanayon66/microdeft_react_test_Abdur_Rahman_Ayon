import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ViewCourses from './pages/ViewCourses';
import CreateCourse from './pages/CreateCourse';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/view-courses" element={<ViewCourses />} />
        <Route path="/create-course" element={<CreateCourse />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
