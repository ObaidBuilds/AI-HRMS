
const Error = () => {
  return (
    <div className="w-full h-[95vh] flex flex-col justify-center items-center">
      <p className="text-3xl">⚠️</p>
      <p className="mt-3 font-mono text-gray-700 dark:text-gray-200">
        Internal Server Error, Try Again Later
      </p>
    </div>
  );
};

export default Error;
