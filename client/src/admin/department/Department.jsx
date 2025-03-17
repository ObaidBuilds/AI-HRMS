import React from "react";
import { FaUsers, FaEdit } from "react-icons/fa";

const Department = () => {
  // Array of department objects
  const departments = [
    {
      id: 1,
      name: "Marketing",
      icon: <FaUsers className="text-white text-3xl sm:text-4xl" />,
      description:
        "The Marketing Department is responsible for driving brand awareness, generating leads, and promoting the company’s products or services.",
      employees: 100,
      bgColor: "bg-blue-500",
      darkBgColor: "dark:bg-blue-600",
    },
    {
      id: 3,
      name: "Human Resource",
      icon: <FaUsers className="text-white text-3xl sm:text-4xl" />,
      description:
        "The HR Department manages recruitment, employee relations, and ensures a positive workplace culture.",
      employees: 30,
      bgColor: "bg-purple-500",
      darkBgColor: "dark:bg-purple-600",
    },
    {
      id: 5,
      name: "Information Tech.",
      icon: <FaUsers className="text-white text-3xl sm:text-4xl" />,
      description:
        "The IT Department manages the company’s technology infrastructure, software development, and technical support.",
      employees: 50,
      bgColor: "bg-yellow-500",
      darkBgColor: "dark:bg-yellow-600",
    },
    {
      id: 6,
      name: "Operations",
      icon: <FaUsers className="text-white text-3xl sm:text-4xl" />,
      description:
        "The Operations Department ensures smooth day-to-day functioning of the company and optimizes business processes.",
      employees: 40,
      bgColor: "bg-indigo-500",
      darkBgColor: "dark:bg-indigo-600",
    },
    {
      id: 7,
      name: "Customer Support",
      icon: <FaUsers className="text-white text-3xl sm:text-4xl" />,
      description:
        "The Customer Support Department assists customers with inquiries, resolves issues, and ensures customer satisfaction.",
      employees: 60,
      bgColor: "bg-pink-500",
      darkBgColor: "dark:bg-pink-600",
    },
    {
      id: 8,
      name: "Research & Development",
      icon: <FaUsers className="text-white text-3xl sm:text-4xl" />,
      description:
        "The R&D Department focuses on innovation, product development, and improving existing offerings.",
      employees: 25,
      bgColor: "bg-teal-500",
      darkBgColor: "dark:bg-teal-600",
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
      <div className="flex flex-col md:flex-row flex-wrap gap-3">
        {departments.map((department) => (
          <div
            key={department.id}
            className="group flex w-full md:h-[125px] md:w-[49%] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className={`w-[30%] flex items-center justify-center ${department.bgColor} ${department.darkBgColor}`}
            >
              {department.icon}
            </div>

            <div className="w-[70%] p-4 relative">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button>
                  <i className="fas fa-pencil-alt text-sm"></i>
                </button>
              </div>

              <h1 className="sm:text-lg font-extrabold text-gray-800 dark:text-white mb-2">
                {department.name}
              </h1>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3">
                {department.description.slice(0, 65) + "..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Department;
