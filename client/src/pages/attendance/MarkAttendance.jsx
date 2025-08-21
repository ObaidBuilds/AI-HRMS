import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { formatDate } from "../../utils";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQRCodeForAttendance,
  markAttendanceUsingQrCode,
} from "../../services/attendance.service";
import axiosInstance from "../../axios/axiosInstance";

const MarkAttendance = () => {
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(null);

  const { loading, qrcode } = useSelector((state) => state.attendance);

  const handleQrCodeGeneration = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(generateQRCodeForAttendance({ latitude, longitude }));
      },
      (error) => {
        toast.error("Error getting location:", error.message);
      }
    );
  };

  const handleMarkAttendanceUsingQr = () => {
    dispatch(
      markAttendanceUsingQrCode({
        dispatch,
        qrcode,
      })
    );
  };

  useEffect(() => {
    async function getDateFromAPI() {
      const { data } = await axiosInstance.get("/insights/date");
      console.log(data);
      setCurrentDate(data.datetime);
    }
    getDateFromAPI();
  }, []);

  return (
    <>
      <Helmet>
        <title>Mark Attendance - Metro HR</title>
      </Helmet>

      <section className="h-[80vh] sm:h-[90vh]">
        <main className="flex justify-center items-center h-full">
          {qrcode ? (
            <div className="flex flex-col justify-center items-center gap-10">
              <div className="flex flex-col justify-center items-center gap-3">
                <img
                  className="sm:w-[170px] h-[170px] rounded-xl"
                  src={qrcode}
                  alt="qrcode"
                />
                <button
                  disabled={loading}
                  onClick={handleMarkAttendanceUsingQr}
                  className="text-sm py-3 mt-10 w-[300px] bg-green-600 rounded-3xl font-bold hover:bg-green-700 text-gray-300"
                >
                  {loading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <>
                      <i className="fas fa-qrcode mr-2"></i>
                      Mark attendance for {formatDate(new Date())}
                    </>
                  )}
                </button>
                {loading && (
                  <div className="scan-overlay">
                    <div className="scan-line"></div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              disabled={loading}
              onClick={handleQrCodeGeneration}
              className="text-sm py-3 w-[300px] bg-green-600 rounded-3xl font-bold hover:bg-green-700 text-gray-200"
            >
              {loading ? (
                <div className="flex gap-2 justify-center">
                  Marking
                  <i className="fas fa-spinner fa-spin"></i>
                </div>
              ) : (
                <>
                  <i className="fas fa-qrcode mr-2"></i>
                  Generate QR code for{" "}
                  {currentDate ? formatDate(currentDate) : "loading..."}
                </>
              )}
            </button>
          )}
        </main>
      </section>
    </>
  );
};

export default MarkAttendance;
