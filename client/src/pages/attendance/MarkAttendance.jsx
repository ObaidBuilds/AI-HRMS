import React, { useState } from "react";
import { formatDate } from "../../utils";

const MarkAttendance = () => {
  const [qrCode, setQrCode] = useState(false);

  return (
    <section className=" h-[60vh]">
      <main className="flex justify-center items-center h-full">
        {qrCode ? (
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="sm:w-[170px] h-[170px]">
              <img
                className="w-full rounded-xl"
                src="data:image/png;base64,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"
                alt=""
              />
              <div className="scan-overlay">
                <div className="scan-line"></div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              setQrCode(true);
              setTimeout(() => {
                setQrCode(false);
              }, 3000);
            }}
            className="text-sm py-3 px-7 bg-green-600 rounded-3xl font-bold hover:bg-green-700 text-gray-300"
          >
            <i className="fas fa-qrcode mr-2"></i>
            Generate QR code & mark attendance for {formatDate(new Date())}
          </button>
        )}
      </main>
    </section>
  );
};

export default MarkAttendance;
