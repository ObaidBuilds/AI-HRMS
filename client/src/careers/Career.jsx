import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobOpenings } from "../services/recruitment.service";
import { formatDate } from "../utils";

const Career = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.recruitment);

  useEffect(() => {
    dispatch(getJobOpenings("open"));
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-600 h-12 w-12"></div>
        </div>
      </div>
    );

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Current Opportunities
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our available positions and find your perfect fit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {job.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                    {job.department.name}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                    {job.role.name}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {job.location}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    ${job.minSalary} - ${job.maxSalary}
                  </p>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {job.description}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Deadline:</span>{" "}
                    {formatDate(job.deadline)}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center">
                    Apply Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
