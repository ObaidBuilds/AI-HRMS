
const FilterButton = ({ setState, state, filter }) => {
  return (
    <button
      onClick={() => setState(filter.value)}
      className={`hidden sm:flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-sm font-semibold border py-1 px-5 rounded-3xl transition-all  ease-in-out duration-300
   ${
     state === filter.value
       ? "border-blue-500 bg-blue-100 text-blue-600 dark:bg-transparent dark:text-blue-400"
       : "border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300"
   } 
   hover:border-blue-500 hover:bg-blue-100 hover:text-blue-600 
   dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500 
   focus:outline-none focus:ring-1 focus:ring-blue-500`}
    >
      <i className={`text-base fas ${filter.icon}`}></i>
      {filter.label}
    </button>
  );
};

export default FilterButton;
