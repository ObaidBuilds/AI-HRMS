import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Employees',
        data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
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
        text: 'Employee Performance',
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '290px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
