import * as XLSX from "xlsx";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bulkUploadEmployees } from "../../../services/employee.service";

const ImportExcelModal = ({ onClose }) => {
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    if (!file || !file.name.endsWith(".xlsx")) {
      setError("Please upload a valid Excel (.xlsx) file.");
      return;
    }

    setFileName(file.name);
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
      const file = files[0];
      handleFileUpload(file);
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
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleUpload = async () => {
    if (!jsonData) {
      setError("No data to upload.");
      return;
    }

    dispatch(bulkUploadEmployees(jsonData));
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        id="modal"
        className="border border-gray-300 dark:border-gray-700 bg-white text-gray-800 p-8 rounded-lg w-[95%] md:w-[500px] shadow-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-sm cursor-pointer hover:text-gray-800 transition duration-200"
        >
          <i className="fas fa-times"></i>
        </button>
        <div
          className="border-2 border-dashed border-gray-400 rounded-lg p-8 flex justify-center items-center flex-col text-center space-y-4 cursor-pointer transition-transform"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <i
            className={`fas fa-upload text-4xl text-gray-600 mb-4 transition-all ease-in-out duration-200 ${
              isDragging ? "scale-150" : ""
            }`}
          ></i>
          <p className="text-lg font-semibold text-gray-700">
            Drag & Drop your file here
          </p>
          <p className="text-sm text-gray-500">or</p>
          <label
            htmlFor="file-upload"
            className="text-blue-500 text-sm font-medium cursor-pointer hover:text-blue-600 transition duration-200"
          >
            Browse to select a file
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileSelect}
            />
          </label>

          {fileName && (
            <p className="mt-4 text-sm font-semibold text-gray-600">
              Selected file: {fileName}
            </p>
          )}
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          {jsonData && (
            <button
              onClick={handleUpload}
              className="mt-4 py-3 text-sm px-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportExcelModal;
