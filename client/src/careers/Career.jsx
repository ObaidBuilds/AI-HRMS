import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/loaders/Loader";
import JobCard from "../components/shared/cards/JobCard";
import { getJobOpenings } from "../services/recruitment.service";
import JobApplicationModal from "../components/shared/modals/JobApplicationModal";
import Footer from "../components/ui/Footer";

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
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {loading && <Loader />}

      {/* Hero Section */}
      <div className="relative h-[570px] bg-gray-900 flex items-center justify-center">
        <nav className="w-full h-[80px] flex justify-between items-center fixed top-0 left-0 z-50 px-3 sm:px-14">
          <div className="pt-5 pl-7">
            <img className="w-[70px]" src="/metro.png" alt="logo" />
          </div>
          <div></div>
        </nav>

        <div className="absolute z-40 inset-0 bg-black opacity-60"></div>
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          }}
        ></div>

        <div className="relative z-50 text-center px-4 mx-auto text-white mt-10 sm:mt-6">
          <div className="mb-8 animate-float">
            <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
              We're Hiring
            </span>
            <h1 className="text-[2rem] md:text-[3rem] font-extrabold my-3 sm:my-4 leading-tight">
              Build Your Career <br /> With Us
            </h1>
            <p className="text-[1.1rem] sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join our team of innovators and help shape the future of our
              industry. Discover exciting opportunities that match your skills.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
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

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div id="jobs">
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} onApply={setJobId} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-3">
                No Current Openings
              </h3>
              <p className="text-gray-500 max-w-sm text-sm">
                We don't have any job openings at the moment, but please check
                back later or follow us for updates on new opportunities.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />

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
