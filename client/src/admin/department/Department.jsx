import React from "react";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";

const colors = [
  { bg: "bg-blue-500", darkBg: "dark:bg-blue-600" },
  { bg: "bg-purple-500", darkBg: "dark:bg-purple-600" },
  { bg: "bg-yellow-500", darkBg: "dark:bg-yellow-600" },
  { bg: "bg-indigo-500", darkBg: "dark:bg-indigo-600" },
  { bg: "bg-pink-500", darkBg: "dark:bg-pink-600" },
  { bg: "bg-teal-500", darkBg: "dark:bg-teal-600" },
  { bg: "bg-red-500", darkBg: "dark:bg-red-600" },
  { bg: "bg-green-500", darkBg: "dark:bg-green-600" },
];

const Department = () => {
  const { departments } = useSelector((state) => state.department);
  const { roles } = useSelector((state) => state.role);

  return (
    <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
      <div>
        <h1 className="hidden sm:block text-xl font-extrabold mb-5 text-gray-700 border-b pb-2">
          Departments in Metro Cash & Carry
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-3">
          {departments.map((department, index) => {
            const color = colors[index % colors.length];

            return (
              <div
                key={department.id}
                className="group flex w-full md:h-[135px] md:w-[49%] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`w-[30%] flex items-center justify-center ${color.bg} ${color.darkBg}`}
                >
                  <FaUsers className="text-white text-3xl sm:text-4xl" />
                </div>

                <div className="w-[70%] p-4 relative">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button>
                      <i className="fas fa-pencil-alt text-sm"></i>
                    </button>
                  </div>

                  <h1 className="sm:text-lg font-extrabold text-gray-800 dark:text-white mb-1">
                    {department.name}
                  </h1>

                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                    {/* {department?.description?.slice(0, 65) + "..." } */}
                    The Marketing Department is responsible for driving brand
                    awareness
                  </p>

                  <p className="text-[0.85rem] text-gray-600 rounded-lg ">
                    {department.head?.name || "No Head Assigned"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h1 className="hidden sm:block text-xl font-extrabold mb-5 text-gray-700 border-b pb-2">
          Positions in Metro Cash & Carry
        </h1>

        <div className="flex flex-col md:flex-row flex-wrap gap-3">
          {roles.map((role, index) => {
            const color = colors[index % colors.length];

            return (
              <div
                key={role.id}
                className="group flex w-full md:h-[130px] md:w-[49%] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`w-[30%] flex items-center justify-center ${color.bg} ${color.darkBg}`}
                >
                  <FaUserTie className="text-white text-2xl sm:text-3xl" />
                </div>

                <div className="w-[70%] p-4 relative">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button>
                      <i className="fas fa-pencil-alt text-sm"></i>
                    </button>
                  </div>

                  <h1 className="sm:text-lg font-extrabold text-gray-800 dark:text-white mb-1">
                    {role.name}
                  </h1>

                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3">
                    {role?.description?.slice(0, 90) + "..."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Department;
