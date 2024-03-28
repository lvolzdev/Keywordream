import React, { useEffect, useRef } from "react";
import ApexChart from "react-apexcharts";

const LineChartComponent = ({ lineChart, chartColor }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current.chart;

    // 마지막 인덱스 찾기
    let lastIndex = -1;
    for (let i = lineChart.length - 1; i >= 0; i--) {
      if (lineChart[i].y !== null) {
        lastIndex = i;
        break;
      }
    }

    // 끝점에 마커 표시
    if (lastIndex !== -1) {
      const series = chart.w.globals.series[0];
      const x = chart.w.globals.seriesX[0][lastIndex];
      const y = series[lastIndex];

      chart.addPointAnnotation({
        x,
        y,
        marker: {
          size: 3.5,
          fillColor: chartColor,
          strokeColor: chartColor,
          radius: 2,
        },
      });
    }
  }, [lineChart]);

  return (
    <div>
      <ApexChart
        ref={chartRef}
        type="line"
        series={[
          {
            name: "Price",
            data: lineChart,
          },
        ]}
        options={{
          colors: [chartColor],
          chart: {
            height: 500,
            width: "100%",
            toolbar: {
              tools: {},
            },
            background: "transparent",
            animations: {
              enabled: false,
            },
          },
          fill: {
            type: "solid",
          },
          stroke: {
            curve: "smooth",
            width: 2.8,
          },
          grid: {
            show: false,
          },
          xaxis: {
            type: "datetime",
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          annotations: {
            position: "front",
          },
        }}
      />
    </div>
  );
};

export default LineChartComponent;
