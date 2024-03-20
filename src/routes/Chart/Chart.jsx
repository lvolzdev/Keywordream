
import React from "react";
import ApexChart from "react-apexcharts";
import Button from "@mui/material/Button";

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

  const prices = data.map((price) => Number(price.close));

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
          colors: ["#FE2F4D"],
          chart: {
            height: 500,
            width: "100%",
            toolbar: {
              tools: {},
            },
            background: "transparent",
          },
          fill: {
            type: "solid",
          },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          grid: {
            show: false,
          },
          xaxis: {
            type: "datetime",
            categories: data.map((data) => data.time_close),
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

      <div className="btn-container" style={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "white",
            color: "black",
            borderColor: "black",
            minWidth: "80%",
            "&:hover": { backgroundColor: "#F0F0F0", borderColor: "black" },
          }}
        >
          일별 & 실시간 시세
        </Button>
      </div>
    </div>
  );
}
