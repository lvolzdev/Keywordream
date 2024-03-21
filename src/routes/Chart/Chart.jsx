import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApexChart from "react-apexcharts";
import Button from "@mui/material/Button";
import { getChart } from "../../lib/apis/chartApi";

export default function Chart() {
  const stockCode = useParams().stockCode;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await getChart(stockCode);
        console.log(response.data.t8412OutBlock1);

        if (response) {
          // 시세 데이터 처리
          const chartSeriesData = response.data.t8412OutBlock1.map((res) => ({
            x: `${res.date.slice(0, 4)}-${res.date.slice(
              4,
              6
            )}-${res.date.slice(6, 8)}T${res.time.slice(0, 2)}:${res.time.slice(
              2,
              4
            )}:00.000Z`,
            y: Number(res.close),
          }));
          setChartData(chartSeriesData);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchChart();
  }, [stockCode]);

  const seriesData = chartData.map((data) => {
    return {
      x: data.x, // 날짜 문자열
      y: data.y, // 가격
    };
  });

  // const categories = chartData.map((data) => new Date(data.x));
  // const prices = chartData.map((data) => data.y);

  console.log(seriesData);

  return (
    <div className="chart-container">
      <Button
        size="small"
        sx={{
          backgroundColor: "white",
          color: "black",
          borderColor: "black",
          minWidth: "10%",
          "&:hover": { backgroundColor: "#F0F0F0", borderColor: "black" },
        }}
      >
        [자세한 차트 보기]
      </Button>
      <ApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: seriesData,
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
