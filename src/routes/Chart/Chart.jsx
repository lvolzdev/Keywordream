import React from "react";
import ApexChart from "react-apexcharts";

// 차트 예시
export default function Chart() {
  // TODO
  const data = [
    { time_close: "2023-03-01T00:00:00.000Z", close: "100" },
    { time_close: "2023-03-02T00:00:00.000Z", close: "105" },
    { time_close: "2023-03-03T00:00:00.000Z", close: "102" },
    { time_close: "2023-03-04T00:00:00.000Z", close: "106" },
    { time_close: "2023-03-05T00:00:00.000Z", close: "108" },
    { time_close: "2023-03-06T00:00:00.000Z", close: "110" },
    { time_close: "2023-03-07T00:00:00.000Z", close: "112" },
    { time_close: "2023-03-08T00:00:00.000Z", close: "115" },
    { time_close: "2023-03-09T00:00:00.000Z", close: "113" },
    { time_close: "2023-03-10T00:00:00.000Z", close: "111" },
  ];

  // 최고금액, 최저금액
  const prices = data.map((price) => Number(price.close));
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  console.log("최고금액", maxPrice);
  console.log("최저금액", minPrice);

  return (
    <div className="chart-container">
      <ApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: prices,
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 500,
            width: "100%",
            toolbar: {
              tools: {},
            },
            background: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          fill: {
            type: "gradient",
            gradient: {
              gradientToColors: ["#F2CD5C", "#F2921D", "#A61F69", "#400E32"],
              stops: [0, 100],
            },
          },
          grid: {
            show: false,
          },
          xaxis: {
            labels: {
              show: false,
            },
            type: "datetime",
            categories: data.map((date) => date.time_close),
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
          tooltip: {
            y: {
              formatter: (v) => `$ ${v.toFixed(2)}`,
            },
          },
          annotations: {
            y: [
              {
                y: maxPrice,
                borderColor: "#00E396",
                label: {
                  borderColor: "#00E396",
                  style: {
                    color: "#000000",
                    background: "#00E396",
                  },
                  text: "최고금액",
                },
              },
              {
                y: minPrice,
                borderColor: "#FF4560",
                label: {
                  borderColor: "#FF4560",
                  style: {
                    color: "#000000",
                    background: "#FF4560",
                  },
                  text: "최저금액",
                },
              },
            ],
          },
        }}
      />
      <div className="btn-container"></div>
    </div>
  );
}
