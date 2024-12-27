import React, { Suspense, useEffect } from "react";
import Footer from "../components/ui/Footer";
import Loader from "../components/shared/loaders/Loader";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/shared/error/NotFound";
import Navbar from "../components/ui/Navbar";
import Leave from "../pages/leave/Leave";
import Attendance from "../pages/attendance/Attendance";
import Security from "../pages/security/Security";
import Profile from "../pages/profile/Profile";

// Lazy loading the components
const Home = React.lazy(() => import("../pages/home/Home"));
const Complaint = React.lazy(() => import("../pages/complaint/Complaint"));
const Feedback = React.lazy(() => import("../pages/feedback/Feedback"));

const EmployeeApp = () => {
  return (
    <div className="text-gray-100 bg-navy">
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/attendance" element={<Attendance />} />
          {/* 
          <Route path="/profile" element={<Profile />} /> */}
          <Route path="/security" element={<Security />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
};

export default EmployeeApp;
