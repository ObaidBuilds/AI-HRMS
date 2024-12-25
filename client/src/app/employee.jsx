import React, { Suspense, useEffect } from "react";
import Footer from "../components/ui/Footer";
import Loader from "../components/shared/loaders/Loader";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/shared/error/NotFound";
import Navbar from "../components/ui/Navbar";

// Lazy loading the components
const Home = React.lazy(() => import("../pages/home/Home"));
const Complaint = React.lazy(() => import("../pages/complaint/Complaint"));

const EmployeeApp = () => {
  return (
    <div className="text-white bg-navy">
      <Suspense fallback={<Loader />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
};

export default EmployeeApp;
