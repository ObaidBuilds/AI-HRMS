import React, { Suspense, useEffect } from "react";
import Footer from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";
import Loader from "../components/shared/Loader";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/shared/NotFound";
import { getRoles } from "../services/role";
import { useDispatch } from "react-redux";
import { getInsights } from "../services/insights";

// Lazy loading the components
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));
const Employee = React.lazy(() => import("../pages/employee/Employee"));
const AddEmployee = React.lazy(() => import("../pages/employee/AddEmployee"));
const EditEmployee = React.lazy(() => import("../pages/employee/EditEmployee"));
const ViewEmployee = React.lazy(() => import("../pages/employee/ViewEmployee"));
const Attendance = React.lazy(() => import("../pages/attendance/Attendance"));
const LeaveRequest = React.lazy(() => import("../pages/leave/LeaveRequest"));
const EmployeeOnLeave = React.lazy(() =>
  import("../pages/leave/EmployeeOnLeave")
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInsights());
    dispatch(getRoles());
  }, []);

  return (
    <div>
      <div className="min-h-screen max-h-auto bg-gray-900 text-white flex relative">
        <Sidebar />
        <Suspense fallback={<Loader />}>
          <main
            id="overflow"
            className="w-full max-h-auto min-h-screen lg:w-[81%] lg:ml-[250px] p-3 mt-[65px] lg:mt-0"
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Employee Module */}
              <Route path="/employees" element={<Employee />} />
              <Route path="/employee/:employeeID" element={<ViewEmployee />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route
                path="/edit-employee/:employeeID"
                element={<EditEmployee />}
              />
              {/* Attendance Module */}
              <Route path="/mark-attendance" element={<Attendance />} />
              {/* Leave Module */}
              <Route path="/leave-request" element={<LeaveRequest />} />
              <Route path="/on-leave" element={<EmployeeOnLeave />} />
              {/* Feeback Module */}

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </main>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
