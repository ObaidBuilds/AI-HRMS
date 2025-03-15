import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils";
import {
  generateQRCodeForAttendance,
  markAttendanceUsingQrCode,
} from "../../services/attendance.service";
import toast from "react-hot-toast";

const MarkAttendance = () => {
  const dispatch = useDispatch();
  const { loading, qrcode } = useSelector((state) => state.attendance);

  function handleQrCodeGeneration() {
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
  }

  function handleMarkAttendanceUsingQr() {
    dispatch(
      markAttendanceUsingQrCode({
        dispatch,
        qrcode,
      })
    );
  }

  return (
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
                className="text-sm py-3 w-[300px] bg-green-600 rounded-3xl font-bold hover:bg-green-700 text-gray-300"
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
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fas fa-qrcode mr-2"></i>
                Generate QR code for {formatDate(new Date())}
              </>
            )}
          </button>
        )}
      </main>
    </section>
  );
};

export default MarkAttendance;
