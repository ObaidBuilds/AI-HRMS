import React, { Suspense, useEffect } from "react";
import Footer from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";
import Loader from "../components/shared/loaders/Loader";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/shared/error/NotFound";
import { getRoles } from "../services/role";
import { useDispatch } from "react-redux";
import { getInsights } from "../services/insights";
import { getDepartments } from "../services/department";

// Lazy loading the components
const Dashboard = React.lazy(() => import("../admin/dashboard/Dashboard"));
const Employee = React.lazy(() => import("../admin/employee/Employee"));
const AddEmployee = React.lazy(() => import("../admin/employee/AddEmployee"));
const EditEmployee = React.lazy(() => import("../admin/employee/EditEmployee"));
const ViewEmployee = React.lazy(() => import("../admin/employee/ViewEmployee"));
const Attendance = React.lazy(() => import("../admin/attendance/Attendance"));
const Feedback = React.lazy(() => import("../admin/feedback/Feedback"));
const LeaveRequest = React.lazy(() => import("../admin/leave/LeaveRequest"));
const Complaint = React.lazy(() => import("../admin/complaint/Complaint"));
const EmployeeOnLeave = React.lazy(() =>
  import("../admin/leave/EmployeeOnLeave")
);

const AdminApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInsights());
    dispatch(getRoles());
    dispatch(getDepartments());
  }, []);

  return (
    <div>
      <div className="min-h-screen max-h-auto bg-gray-900 text-white flex relative">
        <Sidebar />
        <Suspense fallback={<Loader />}>
          <main
            id="overflow"
            className="w-full max-h-auto min-h-screen lg:w-[82%] lg:ml-[255px] py-2 px-2 mt-[69px] lg:mt-0"
          >
            <div className="mb-2">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<Employee />} />
                <Route
                  path="/employee/:employeeID"
                  element={<ViewEmployee />}
                />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route
                  path="/edit-employee/:employeeID"
                  element={<EditEmployee />}
                />
                <Route path="/mark-attendance" element={<Attendance />} />
                <Route path="/leave-request" element={<LeaveRequest />} />
                <Route path="/on-leave" element={<EmployeeOnLeave />} />
                <Route path="/feedback-management" element={<Feedback />} />
                <Route path="/complaint-management" element={<Complaint />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminApp;
