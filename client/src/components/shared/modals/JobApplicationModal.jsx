import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ButtonLoader from "../loaders/ButtonLoader";
import { createJobApplication } from "../../../services/recruitment.service";

const JobApplicationModal = ({ jobId, setJobId, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("coverLetter", data.coverLetter);

    if (data.resume && data.resume[0]) {
      formData.append("resume", data.resume[0]);
    }
    console.log(formData);

    dispatch(createJobApplication({ jobId, application: formData }))
      .unwrap()
      .then(() => {
        reset();
        setJobId(null);
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div id="overflow" className="w-[90%] sm:max-w-xl">
        <div id="modal" className="bg-white rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <h2 className="font-bold text-gray-600">Job Application</h2>
              <button
                type="button"
                onClick={() => setJobId(null)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]  ${
                      errors.name
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Full Name *"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]  ${
                      errors.email
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Email Address *"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 font-[500]  ${
                      errors.phone
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Phone Number *"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register("resume", {
                      required: "Resume is required",
                    })}
                    className={`w-full bg-[#EFEFEF] text-sm p-[17px] rounded-full focus:outline focus:outline-2 font-[500] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                      errors.resume
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </div>
                {errors.resume && (
                  <p className="text-xs text-red-500 ml-1">
                    {errors.resume.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <textarea
                id="coverLetter"
                rows={3}
                {...register("coverLetter", {
                  required: "Cover letter is required",
                })}
                className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-xl focus:outline focus:outline-2 font-[500]  ${
                  errors.coverLetter
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="Cover Letter *"
              />
              {errors.coverLetter && (
                <p className="text-xs text-red-500 ml-1">
                  {errors.coverLetter.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full text-[0.9rem] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-full shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <ButtonLoader />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;
