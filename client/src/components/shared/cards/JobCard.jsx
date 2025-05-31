import { formatDate } from "../../../utils";

const JobCard = ({ job, onApply }) => {
  return (
    <div
      key={job._id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 border border-gray-200 hover:-translate-y-1"
    >
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
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
            <i className="fas fa-dollar-sign text-gray-500"></i>${job.minSalary}{" "}
            - ${job.maxSalary}
          </p>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">{job.description}</p>

        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            <span className="font-medium">Deadline:</span>{" "}
            {formatDate(job.deadline)}
          </p>
          <button
            onClick={() => onApply(job._id)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center"
          >
            Apply Now
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
