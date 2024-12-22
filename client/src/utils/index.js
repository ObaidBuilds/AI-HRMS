import * as XLSX from "xlsx";

const URL = import.meta.env.VITE_URL;

const useGetToken = () => {
  try {
    const token = sessionStorage.getItem("session");
    if (!token) return null;
    return token;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function downloadXls(data) {
  console.log("first");

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Employees");

  XLSX.writeFile(wb, "employees.xlsx");
}

export { useGetToken, URL, formatDate, downloadXls };
