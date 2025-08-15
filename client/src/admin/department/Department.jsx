import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { colors } from "../../constants";
import { useSelector } from "react-redux";
import { FaUsers, FaUserTie } from "react-icons/fa";
import Loader from "../../components/shared/loaders/Loader";
import RoleModal from "../../components/shared/modals/RoleModal";
import FetchError from "../../components/shared/error/FetchError";
import DepartmentModal from "../../components/shared/modals/DepartmentModal";

const Department = () => {
  const { roles, loading: roleLoading } = useSelector((state) => state.role);
  const { departments, loading, error } = useSelector(
    (state) => state.department
  );

  const [action, setAction] = useState("");
  const [roleModal, setRoleModal] = useState(null);
  const [roleAction, setRoleAction] = useState("");
  const [departmentModal, setDepartmentModal] = useState(null);

  if (error) return <FetchError error={error} />;

  return (
    <>
      <Helmet>
        <title>Depat & Role - Metro HR</title>
      </Helmet>
      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        {(loading || roleLoading) && <Loader />}
        <div>
          {/* <button
          onClick={() => {
            setAction("create");
            setDepartmentModal(true);
          }}
        >
          Create
        </button> */}
          <div className="flex flex-col md:flex-row flex-wrap gap-3">
            {departments.map((department, index) => {
              const color = colors[index % colors.length];

              return (
                <div
                  key={department._id}
                  className="group flex w-full md:h-[135px] md:w-[49%] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className={`w-[30%] flex items-center justify-center ${color.bg} ${color.darkBg}`}
                  >
                    <FaUsers className="text-white text-3xl sm:text-4xl" />
                  </div>

                  <div className="w-[70%] p-4 relative">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => {
                          setAction("update");
                          setDepartmentModal(department);
                        }}
                      >
                        <i className="fas fa-pencil-alt text-sm"></i>
                      </button>
                    </div>

                    <h1 className="sm:text-lg font-bold text-gray-800 dark:text-white mb-1">
                      {department.name}
                    </h1>

                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
                      {department.description.slice(0, 65) + "..."}
                    </p>

                    <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 rounded-lg ">
                      {department.head?.name || "No Head Assigned"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          {/* <button
          onClick={() => {
            setRoleAction("create");
            setRoleModal(true);
          }}
        >
          Create
        </button> */}
          <div className="flex flex-col md:flex-row flex-wrap gap-3">
            {roles.map((role, index) => {
              const color = colors[index % colors.length];

              return (
                <div
                  key={role._id}
                  className="group flex w-full md:h-[135px] md:w-[49%] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className={`w-[30%] flex items-center justify-center ${color.bg} ${color.darkBg}`}
                  >
                    <FaUserTie className="text-white text-2xl sm:text-3xl" />
                  </div>

                  <div className="w-[70%] p-4 relative">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => {
                          setRoleAction("update");
                          setRoleModal(role);
                        }}
                      >
                        <i className="fas fa-pencil-alt text-sm"></i>
                      </button>
                    </div>

                    <h1 className="sm:text-lg font-bold text-gray-800 dark:text-white mb-1">
                      {role.name}
                    </h1>

                    <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-3">
                      {role?.description?.slice(0, 65) + "..."}
                    </p>

                    <p className="text-[0.85rem] text-gray-600 dark:text-gray-400 rounded-lg">
                      Total Employees : --
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {departmentModal && (
          <DepartmentModal
            action={action}
            department={departmentModal}
            onClose={() => setDepartmentModal(null)}
          />
        )}

        {roleModal && (
          <RoleModal
            role={roleModal}
            action={roleAction}
            onClose={() => setRoleModal(null)}
          />
        )}
      </section>
    </>
  );
};

export default Department;
