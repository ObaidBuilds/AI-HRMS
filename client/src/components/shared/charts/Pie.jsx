import { Pie } from "react-chartjs-2";
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

const PieGraph = () => {
  const { totalEmployees, totalMaleEmployees, totalFemaleEmployees } =
    useSelector((state) => state.insight.insights);

  const malePercentage = totalEmployees
    ? ((totalMaleEmployees / totalEmployees) * 100).toFixed(0)
    : 0;
  const femalePercentage = totalEmployees
    ? ((totalFemaleEmployees / totalEmployees) * 100).toFixed(0)
    : 0;

  const pieData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Employee Category %",
        data: [malePercentage, femalePercentage],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Employee Category Overview",
      },
    },
  };

  return <Pie data={pieData} options={pieOptions} />;
};

export default PieGraph;
