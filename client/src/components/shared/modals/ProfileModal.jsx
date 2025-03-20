import React from "react";

const ProfileModal = ({
  handleFileChange,
  imagePreview,
  name,
  showButton,
  loading,
  handleClick,
  close,
}) => {
  const handleEditImage = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        id="modal"
        className="relative bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px] p-4"
      >
        {/* Edit Icon */}
        <button
          onClick={handleEditImage}
          className="absolute top-2 right-2 text-gray-600 hover:text-blue-500"
          aria-label="Edit Image"
        >
          <i className="fas fa-pencil-alt text-[17px]"></i>
        </button>

        {/* Hidden File Input */}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border border-gray-300"
          />

          {/* Name */}
          <h2
            style={{
              fontFamily: "Bruno Ace",
            }}
            className="mt-4 text-lg font-semibold text-gray-800"
          >
            {name}
          </h2>
        </div>
        {showButton && (
          <button
            onClick={handleClick}
            disabled={loading}
            className="text-gray-300 w-full p-4 text-sm font-semibold bg-blue-600 rounded-3xl mt-3 hover:bg-blue-700"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Update"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
