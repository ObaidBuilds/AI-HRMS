import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const {
    insights: { overallAttendancePercentage },
  } = useSelector((state) => state.insight);

  const attendancePercentage = overallAttendancePercentage.map(
    (item) => item.attendancePercentage
  );

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Attendance Percentage",
        data: attendancePercentage,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Monthly Attendance Percentage",
      },
    },
    scales: {
      x: {
        position: "bottom",
      },
      y: {
        position: "left",
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "290px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
