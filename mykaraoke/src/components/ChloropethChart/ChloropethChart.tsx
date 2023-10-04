import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import * as ChartGeo from "chartjs-chart-geo";
import { useEffect } from "react";

// register controller in chart.js and ensure the defaults are set
ChartJS.register(
  ChartGeo.ChoroplethController,
  ChartGeo.GeoFeature,
  ChartGeo.ColorScale,
  ChartGeo.ProjectionScale
);

export default function ChloropethChart({ data, category }: any) {
  async function getData() {
    const response = await fetch("https://unpkg.com/us-atlas/states-10m.json");
    const us = await response.json();
    const nation = ChartGeo.topojson.feature(us, us.objects.nation).features[0];
    const states = ChartGeo.topojson.feature(us, us.objects.states).features;

    const chart = new ChartJS(
      document.getElementById("canvas").getContext("2d"),
      {
        type: "choropleth",
        data: {
          labels: states.map((d) => d.properties.name),
          datasets: [
            {
              label: "States",
              outline: nation,
              data: states.map((d) => ({
                feature: d,
                value: Math.random() * 10,
              })),
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            projection: {
              axis: "x",
              projection: "albersUsa",
            },
            color: {
              axis: "x",
              quantize: 5,
              legend: {
                position: "bottom-right",
                align: "bottom",
              },
            },
          },
        },
      }
    );
  }

  useEffect(() => {
    let canvas = document.getElementById("canvas");
    if (!canvas) return;

    fetch("https://unpkg.com/us-atlas/states-10m.json")
      .then((r) => r.json())
      .then((us) => {
        const nation = ChartGeo.topojson.feature(us, us.objects.nation)
          .features[0];
        const states = ChartGeo.topojson.feature(
          us,
          us.objects.states
        ).features;

        const chart = new Chart(canvas.getContext("2d"), {
          type: "choropleth",
          data: {
            labels: states.map((d) => d.properties.name),
            datasets: [
              {
                label: "States",
                outline: nation,
                data: states.map((d) => ({
                  feature: d,
                  value: Math.random() * 10,
                })),
              },
            ],
          },
          options: {
            legend: {
              display: false,
            },
            scale: {
              projection: "albersUsa",
            },
            geo: {
              colorScale: {
                display: true,
                position: "bottom",
                quantize: 5,
                legend: {
                  position: "bottom-right",
                },
              },
            },
          },
        });
      });
  });

  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
}
