import { useForm } from "react-hook-form";
import ButtonLoader from "../../components/shared/loaders/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../services/recruitment.service";

const PostJob = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);
  const { loading } = useSelector((state) => state.recruitment);
  const departments = useSelector((state) => state.department.departments);

  const onSubmit = (data) => {
    dispatch(createJob(data));
    reset();
  };

  return (
    <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        id="overflow"
        className="w-[90%] sm:max-w-lg h-[500px] overflow-auto"
      >
        <div id="modal" className="bg-white rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <h2 className="font-bold text-gray-600 text-[0.95rem]">
                Post New Job Opening
              </h2>
              <button className="text-gray-500 hover:text-gray-700 text-sm">
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Grid Row 1 */}
            <div className="grid grid-cols-1 gap-4">
              {/* Job Title */}
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="title"
                    type="text"
                    {...register("title", {
                      required: "Job title is required",
                    })}
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]  ${
                      errors.title
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Job title *"
                  />
                </div>
                {errors.title && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Application Deadline */}
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="deadline"
                    type="date"
                    {...register("deadline", {
                      required: "Deadline is required",
                    })}
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]  ${
                      errors.deadline
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                {errors.deadline && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
            </div>

            {/* Grid Row 2 */}
            <div className="grid grid-cols-1 gap-4">
              {/* Department */}
              <div className="space-y-1">
                <div className="relative">
                  <select
                    id="select"
                    {...register("department", {
                      required: "Department is required",
                    })}
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]  ${
                      errors.department
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">---Select department---</option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.department && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.department.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-1">
                <div className="relative">
                  <select
                    id="select"
                    {...register("role", { required: "Role is required" })}
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]  ${
                      errors.role
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">---Select role---</option>
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.role && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            {/* Grid Row 3 */}
            <div className="grid grid-cols-1 gap-4">
              {/* Job Type */}
              <div className="space-y-1">
                <div className="relative">
                  <select
                    id="select"
                    {...register("type", { required: "Job type is required" })}
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]  ${
                      errors.type
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <option value="">---Select job type---</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                {errors.type && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="location"
                    type="text"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]  ${
                      errors.location
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Location *"
                  />
                </div>
                {errors.location && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Grid Row 4 - Salary */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="minSalary"
                    type="number"
                    {...register("minSalary")}
                    className="w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]"
                    placeholder="Minimum salary"
                  />
                  <span className="absolute left-5 top-4 text-gray-500 text-sm">
                    ₹
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="maxSalary"
                    type="number"
                    {...register("maxSalary")}
                    className="w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]"
                    placeholder="Maximum salary"
                  />
                  <span className="absolute left-5 top-4 text-gray-500 text-sm">
                    ₹
                  </span>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-1">
              <textarea
                id="description"
                rows={5}
                {...register("description", {
                  required: "Description is required",
                })}
                className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-xl focus:outline focus:outline-2 font-[500]  ${
                  errors.description
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="Job description and responsibilities *"
              />
              {errors.description && (
                <p className="text-xs text-red-500 ml-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full text-[0.9rem] bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-4 px-6 rounded-full shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <ButtonLoader />
                    <span className="ml-2">Posting Job...</span>
                  </>
                ) : (
                  "Post Job"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
