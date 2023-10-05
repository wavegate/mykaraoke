import { Chart as ChartJS, Chart } from "chart.js";
import * as ChartGeo from "chartjs-chart-geo";
import { useEffect } from "react";

ChartJS.register(
  ChartGeo.ChoroplethController,
  ChartGeo.GeoFeature,
  ChartGeo.ColorScale,
  ChartGeo.ProjectionScale
);

export default function ChloropethChart({ data }: any) {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    fetch("https://unpkg.com/us-atlas/states-10m.json")
      .then((r) => r.json())
      .then((us) => {
        const nation = (ChartGeo.topojson.feature(us, us.objects.nation) as any)
          .features[0];
        const states = (ChartGeo.topojson.feature(us, us.objects.states) as any)
          .features;

        const stateNames = states.map((state) => state.properties.name);

        new Chart((canvas as any).getContext("2d"), {
          type: "choropleth",
          data: {
            labels: states.map((d) => d.properties.name),
            datasets: [
              {
                label: "States",
                outline: nation,
                data: states.map((d) => ({
                  feature: d,
                  value: data[d.properties.name] || 0,
                })),
              },
            ],
          },
          options: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `Location of Jobs`,
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
          } as any,
        });
      });
  });

  return (
    <div>
      <div className={`font-bold`}>Jobs source frequency</div>
      <canvas id="canvas"></canvas>
    </div>
  );
}
