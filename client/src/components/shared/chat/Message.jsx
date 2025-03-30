

const Message = ({ isSender, text, time }) => (
  <div
    className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3 px-2`}
  >
    <div
      className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
        isSender
          ? "bg-blue-500 text-white rounded-tr-none dark:bg-blue-600"
          : "bg-gray-200 rounded-tl-none dark:bg-gray-700 dark:text-gray-100"
      }`}
    >
      <p className="text-sm sm:text-[0.92rem] font-medium">{text}</p>
      <p
        className={`text-[0.7rem] sm:text-xs mt-1 text-right ${
          isSender
            ? "text-blue-100 dark:text-blue-200"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {time}
      </p>
    </div>
  </div>
);

export default Message;
