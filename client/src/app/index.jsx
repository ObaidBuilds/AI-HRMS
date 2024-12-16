import React, { Suspense, useEffect } from "react";
import Footer from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";
import Loader from "../components/shared/Loader";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRoles } from "../services/role";
import { getInsights } from "../services/insights";
import NotFound from "../components/shared/NotFound";

// Lazy loading the components
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));
const Employee = React.lazy(() => import("../pages/employee/Employee"));
const AddEmployee = React.lazy(() => import("../pages/employee/AddEmployee"));
const EditEmployee = React.lazy(() => import("../pages/employee/EditEmployee"));
const ViewEmployee = React.lazy(() => import("../pages/employee/ViewEmployee"));

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getInsights());
  }, [dispatch]);

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
              <Route path="/employees" element={<Employee />} />
              <Route path="/employee/:employeeID" element={<ViewEmployee />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route
                path="/edit-employee/:employeeID"
                element={<EditEmployee />}
              />
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
