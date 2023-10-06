import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ data, category }) {
  const filteredData = data.filter((obj) => obj.categories?.includes(category));
  const labels = filteredData.map((keywordObject) => {
    return keywordObject.name;
  });

  const randomColor = () => Math.trunc(Math.random() * 255);

  const chartData = {
    labels,
    datasets: [
      {
        label: category,
        data: filteredData.map((keywordObject) => keywordObject.count),
        backgroundColor: `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.5)`,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${category}`,
      },
    },
  };
  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  );
}
