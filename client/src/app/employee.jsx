import React, { lazy, Suspense } from "react";
import Footer from "../components/ui/Footer";
import Loader from "../components/shared/loaders/Loader";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/shared/error/NotFound";
import Navbar from "../components/ui/Navbar";

// Lazy loading the components
const Home = lazy(() => import("../pages/home/Home"));
const Complaint = lazy(() => import("../pages/complaint/Complaint"));
const Feedback = lazy(() => import("../pages/feedback/Feedback"));
const Leave = lazy(() => import("../pages/leave/Leave"));
const Attendance = lazy(() => import("../pages/attendance/Attendance"));
const Security = lazy(() => import("../pages/security/Security"));
const Update = lazy(() => import("../pages/updates/Update"));
const MarkAttendance = lazy(() => import("../pages/attendance/MarkAttendance"));

const EmployeeApp = () => {
  return (
    <div className="max-h-auto min-h-[50vh] text-gray-200 bg-gray-100 dark:gradient">
      <Navbar />
      <div className="max-h-auto min-h-[50vh]">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/update" element={<Update />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/mark" element={<MarkAttendance />} />
            <Route path="/security" element={<Security />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
};

export default EmployeeApp;
