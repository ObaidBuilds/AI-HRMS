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
          "rgba(30, 144, 255, 0.7)",
          "rgba(220, 20, 60, 0.7)",
          "rgba(255, 193, 7, 0.7)",
          "rgba(32, 178, 170, 0.7)",
          "rgba(138, 43, 226, 0.7)",
          "rgba(255, 140, 0, 0.7)",
        ],

        borderColor: [
          "rgba(30, 144, 255, 1)",
          "rgba(220, 20, 60, 1)",
          "rgba(255, 193, 7, 1)",
          "rgba(32, 178, 170, 1)",
          "rgba(138, 43, 226, 1)",
          "rgba(255, 140, 0, 1)",
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
