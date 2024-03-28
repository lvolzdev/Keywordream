import React from "react";
import ApexChart from "react-apexcharts";

const LineChartComponent = ({ lineChart, chartColor }) => {
  return (
    <div>
      <ApexChart
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
            // categories: xAxis, // x축 고정
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
        }}
      />
    </div>
  );
};

export default LineChartComponent;
