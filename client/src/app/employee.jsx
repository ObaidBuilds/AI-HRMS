import { lazy, Suspense } from "react";
import Loader from "../components/shared/loaders/Loader";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/shared/error/NotFound";
import EmployeeSidebar from "../components/ui/EmployeeSidebar";

const Home = lazy(() => import("../pages/home/Home"));
const Complaint = lazy(() => import("../pages/complaint/Complaint"));
const Feedback = lazy(() => import("../pages/feedback/Feedback"));
const Leave = lazy(() => import("../pages/leave/Leave"));
const Attendance = lazy(() => import("../pages/attendance/Attendance"));
const Update = lazy(() => import("../pages/updates/Update"));
const MarkAttendance = lazy(() => import("../pages/attendance/MarkAttendance"));

const EmployeeApp = () => {
  return (
    <div
      id="transition"
      className="min-h-screen max-h-auto text-gray-800 bg-gray-100 dark:text-gray-200 dark:bg-primary flex justify-between relative"
    >
      <EmployeeSidebar />
      <Suspense fallback={<Loader />}>
        <main
          id="overflow"
          className="w-full lg:w-[85%] lg:ml-[255px] py-1 sm:px-2 mt-[69px] lg:mt-0"
        >
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/update" element={<Update />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/mark" element={<MarkAttendance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <Footer /> */}
        </main>
      </Suspense>
    </div>
  );
};

export default EmployeeApp;
