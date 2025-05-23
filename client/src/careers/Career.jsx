import { formatDate } from "../utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/loaders/Loader";
import { getJobOpenings } from "../services/recruitment.service";
import JobApplicationModal from "../components/shared/modals/JobApplicationModal";

const Career = () => {
  const dispatch = useDispatch();
  const [jobId, setJobId] = useState(null);
  const { jobs, loading } = useSelector((state) => state.recruitment);

  useEffect(() => {
    dispatch(
      getJobOpenings({
        status: "open",
        deadline: new Date().toISOString(),
      })
    );
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <div className="relative h-[570px] bg-gray-900 flex items-center justify-center">
        <nav className="w-full h-[80px] flex justify-between items-center fixed top-0 left-0 z-50 px-3 sm:px-14">
          <div className="pt-5 pl-7">
            <img className="w-[70px]" src="/metro.png" alt="logo" />
          </div>

          <div></div>
        </nav>
        {/* Stronger black overlay */}
        <div className="absolute z-40 inset-0 bg-black opacity-55"></div>

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          }}
        ></div>

        {/* Hero content with enhanced styling */}
        <div className="relative z-50 text-center px-4 mx-auto text-white mt-10 sm:mt-6">
          <div className="mb-8">
            <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
              We're Hiring
            </span>
            <h1 className="text-[2rem] sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Build Your Career <br /> With Us
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join our team of innovators and help shape the future of our
              industry. Discover exciting opportunities that match your skills.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Explore Open Positions
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 border border-gray-200 hover:-translate-y-1"
            >
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                    {job.department.name}
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                    {job.role.name}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-gray-500"></i>
                    {job.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="fas fa-dollar-sign text-gray-500"></i>$
                    {job.minSalary} - ${job.maxSalary}
                  </p>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {job.description}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Deadline:</span>{" "}
                    {formatDate(job.deadline)}
                  </p>
                  <button
                    onClick={() => setJobId(job._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
                  >
                    Apply Now
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {jobId && (
        <JobApplicationModal
          jobId={jobId}
          loading={loading}
          setJobId={setJobId}
        />
      )}
    </div>
  );
};

export default Career;
