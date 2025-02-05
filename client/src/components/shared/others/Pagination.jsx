import { React } from "react";


function Pagination({ currentPage, totalPages, onPageChange }) {
  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-end items-center mt-4 text-[0.82rem] font-medium text-gray-700 dark:text-gray-200 py-2 pr-3">
      <div className="flex items-center space-x-2">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToPrevPage}
          className={`text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={currentPage === 1}
        >
          <i className="fas fa-chevron-left text-sm"></i>
        </button>
        <button
          onClick={goToNextPage}
          className={`text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 ${
            currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-chevron-right text-sm"></i>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
