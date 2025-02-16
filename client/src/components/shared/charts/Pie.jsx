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
        backgroundColor: [
          "rgba(30, 144, 255, 0.7)",
          "rgba(220, 20, 60, 0.7)", 
        ],

        borderColor: [
          "rgba(30, 144, 255, 1)",
          "rgba(220, 20, 60, 1)",
        ],

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
