import React, { Suspense, useEffect } from "react";
import Sidebar from "../components/ui/Sidebar";
import Loader from "../components/shared/loaders/Loader";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/shared/error/NotFound";
import { getRoles } from "../services/role.service";
import { useDispatch } from "react-redux";
import { getInsights } from "../services/insights.service";
import { getDepartments } from "../services/department.service";

// Lazy loading the components
const Dashboard = React.lazy(() => import("../admin/dashboard/Dashboard"));
const Employee = React.lazy(() => import("../admin/employee/Employee"));
const AddEmployee = React.lazy(() => import("../admin/employee/CreateEmployee"));
const EditEmployee = React.lazy(() => import("../admin/employee/UpdateEmployee"));
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
      <div
        id="transition"
        className="min-h-screen max-h-auto text-gray-800 bg-gray-200 dark:text-gray-200 dark:bg-primary flex justify-between relative"
      >
        <Sidebar />
        <Suspense fallback={<Loader />}>
          <main
            id="overflow"
            className="w-full max-h-auto min-h-screen lg:w-[85%] lg:ml-[255px] py-2 px-2 mt-[69px] lg:mt-0"
          >
            <div>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<Employee />} />
                <Route
                  path="/employee/:employeeID"
                  element={<ViewEmployee />}
                />
                <Route path="/employee/create" element={<AddEmployee />} />
                <Route
                  path="/employee/update/:employeeID"
                  element={<EditEmployee />}
                />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/leaves" element={<LeaveRequest />} />
                <Route path="/leave/active-leaves" element={<EmployeeOnLeave />} />
                <Route path="/feedbacks" element={<Feedback />} />
                <Route path="/complaints" element={<Complaint />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            {/* <Footer /> */}
          </main>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminApp;
