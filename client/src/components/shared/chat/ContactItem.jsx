

const ContactItem = ({ employee, isSelected, onSelect }) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
      isSelected
        ? "bg-blue-200 dark:bg-blue-600"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
    }`}
    onClick={() => onSelect(employee)}
  >
    <div className="relative flex-shrink-0">
      <img
        src={employee.profilePic}
        alt={employee.name}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
      />
      <span
        className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-white dark:border-gray-800 ${
          employee.status === "online" ? "bg-green-500" : "bg-gray-400"
        }`}
      ></span>
    </div>
    <div className="flex-1 min-w-0 overflow-hidden">
      <p className="font-semibold text-sm sm:text-[0.92rem] truncate text-gray-900 dark:text-gray-100">
        {employee.name}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-300 truncate">
          {employee.designation}
        </p>
        <p className="text-[0.7rem] pr-3 sm:pr-0 sm:text-xs text-gray-400 dark:text-gray-300">
          ~ {employee.lastSeen}
        </p>
      </div>
    </div>
  </div>
);

export default ContactItem;
