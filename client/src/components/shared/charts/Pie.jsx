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

const PieGraph = ({ labels, title, label, data1, data2 }) => {
  const pieData = {
    labels: [labels.category1, labels.category2],
    datasets: [
      {
        label: label,
        data: [data1, data2],
        backgroundColor: ["rgba(30, 144, 255, 0.7)", "rgba(220, 20, 60, 0.7)"],

        borderColor: ["rgba(30, 144, 255, 1)", "rgba(220, 20, 60, 1)"],

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
        text: title,
      },
    },
  };

  return <Pie data={pieData} options={pieOptions} />;
};

export default PieGraph;
