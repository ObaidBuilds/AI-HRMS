const URL = import.meta.env.VITE_URL;

const configuration = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const formatDate = (date) => {
  if (!date) return ""; 
  const d = new Date(date); 
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0"); 
  return `${year}-${month}-${day}`;
};

export { configuration, URL, formatDate };
