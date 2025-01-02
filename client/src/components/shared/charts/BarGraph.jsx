import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = () => {
  const departmentData = useSelector(
    (state) => state.insight.insights.departmentAttandancePercent
  );

  const departments = departmentData.map((department) => {
    return department._id;
  });

  const departmentAttendancePercentage = departmentData.map((department) => {
    return parseInt(department.attendancePercentage);
  });

  const data = {
    labels: departments || [],
    datasets: [
      {
        label: "Attendance Rate (%)",
        data: departmentAttendancePercentage || [],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Employee Attendance Rate by Department",
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: "Attendance Rate (%)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarGraph;
