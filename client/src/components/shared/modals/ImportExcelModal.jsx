import * as XLSX from "xlsx";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bulkUploadEmployees } from "../../../services/employee.service";

const ImportExcelModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    if (!file || !file.name.endsWith(".xlsx")) {
      setError("Please upload a valid Excel (.xlsx) file.");
      return;
    }

    setFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      let jsonData = XLSX.utils.sheet_to_json(sheet);

      jsonData = jsonData.map((row) => {
        const transformedRow = {};
        Object.keys(row).forEach((key) => {
          const newKey = key.charAt(0).toLowerCase() + key.slice(1);
          transformedRow[newKey] = row[key];
        });
        return transformedRow;
      });

      setJsonData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    } else {
      setError("No file was dropped. Please try again.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e) => {
    handleFileUpload(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!jsonData) {
      setError("No data to upload.");
      return;
    }

    dispatch(bulkUploadEmployees(jsonData));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
      id="modal"
      className="border border-gray-300 dark:border-gray-700 bg-white text-gray-800 p-8 rounded-lg w-[95%] md:w-[550px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-sm cursor-pointer hover:text-gray-800 transition duration-200"
        >
          &times;
        </button>
        <div
          className={`border-2 border-dashed border-gray-400 rounded-lg p-8 flex justify-center items-center flex-col text-center space-y-4 cursor-pointer transition-transform ${isDragging ? "bg-gray-100" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="text-gray-600 text-4xl">
          <i
            className={`fas fa-upload text-4xl text-gray-600 mb-4 transition-all ease-in-out duration-200 ${
              isDragging && "scale-125"
            }`}
          ></i>
          </div>
          <p className="text-lg font-semibold text-gray-700">Drag & Drop your file here</p>
          <p className="text-sm text-gray-500">or</p>
          <label className="text-blue-500 text-sm font-medium cursor-pointer hover:text-blue-600 transition duration-200">
            Browse to select a file
            <input
              type="file"
              className="hidden"
              accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileSelect}
            />
          </label>
        </div>

        {file && (
          <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-md flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">✔</div>
              <span className="text-sm font-medium text-gray-700 truncate max-w-[70%]">{file.name}</span>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-red-500 text-sm font-medium hover:text-red-600 transition duration-200"
            >
              ✖
            </button>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        {jsonData && (
          <button
            onClick={handleUpload}
            className="mt-4 py-3 w-full text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default ImportExcelModal;
