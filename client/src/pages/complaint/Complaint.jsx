import React from "react";


const ComplaintForm = () => {
  return (
    <section className="h-screen overflow-hidde">
      <main className="flex justify-center items-center w-full h-screen text-white">
        <div className="w-full">
          <div className="flex flex-col items-center py-8">
            <h1
              className="text-2xl sm:text-3xl mb-10"
              style={{ fontFamily: "Bruno Ace, sans-serif" }}
            >
              Submit a Complaint
            </h1>
          </div>

          <form className="flex flex-col items-center gap-2 pb-8">
            {/* Department Select */}
            <div className="w-[85%] relative">
              <select
                id="select"
                className="w-full bg-secondary text-center text-[0.8rem] sm:text-[0.9rem] p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-12"
              >
                <option value="">--- Select Complaint Type ---</option>
              </select>
            </div>

            {/* Complaint Subject */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Complaint Subject"
                  className="w-full bg-secondary text-[0.8rem] sm:text-[0.9rem] sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-7"
                />
              </div>
            </div>

            {/* Complaint Description */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <textarea
                  placeholder="Describe your complaint..."
                  rows="5"
                  className="w-full bg-secondary text-[0.8rem] sm:text-[0.9rem] p-[17px] rounded-2xl focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-4 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[85%] text-sm sm text-[0.8rem]:sm:text-[0.9rem] p-[18px] bg-blue-700 text-white rounded-full font-medium hover:bg-gray-500 transition duration-300"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default ComplaintForm;
