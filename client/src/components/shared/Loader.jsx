const Loader = () => {
  return (
    <div
      id="modal"
      className="fixed bg-gray-800 bg-opacity-20 inset-0 z-50 flex justify-center items-center">
      <div className="loading-container">
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
      </div>
    </div>
  );
};

export default Loader;
