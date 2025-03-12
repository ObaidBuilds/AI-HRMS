import * as XLSX from "xlsx";

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
};

const convertDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

function downloadXls(data) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Employees");

  XLSX.writeFile(wb, "employees.xlsx");
}

const getMonthAbbreviation = (month) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month - 1] || "Invalid";
};

export { formatDate, downloadXls, getMonthAbbreviation, convertDate };
