import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import ApexChart from "react-apexcharts";
import Button from "@mui/material/Button";
import { getChart } from "../../lib/apis/chartApi";

export default function Chart() {
  const colors = useMemo(() => ["#FE2F4D", "#1545FF"], []);
  const stockCode = useParams().stockCode;
  const [chartData, setChartData] = useState([]);
  const [chartColor, setChartColor] = useState(colors[0]);
  const [isCandleChart, setIsCandleChart] = useState(false); // 라인 차트와 캔들 차트 토글

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await getChart(stockCode);
        // console.log(response.data.t8412OutBlock1);

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

          // 시세 데이터 추세에 따라 그래프 색상 변경
          var maxVal = chartSeriesData[0].y;
          var minVal = chartSeriesData[0].y;
          var maxDate = new Date(chartSeriesData[0].x);
          var minDate = new Date(chartSeriesData[0].x);

          chartSeriesData.forEach((data) => {
            if (data.y > maxVal) {
              maxVal = data.y;
              maxDate = new Date(data.x);
            }
            if (data.y < minVal) {
              minVal = data.y;
              minDate = new Date(data.x);
            }
          });

          setChartColor(maxDate > minDate ? colors[0] : colors[1]);

          // const trend =
          //   chartSeriesData[chartSeriesData.length - 1].y -
          //   chartSeriesData[0].y;
          // setChartColor(trend >= 0 ? colors[0] : colors[1]);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchChart();
  }, [stockCode, colors]);

  const seriesData = chartData.map((data) => {
    return {
      x: data.x, // 날짜 문자열
      y: data.y, // 가격
    };
  });
  // console.log(seriesData);

  return (
    <div className="chart-container">
      <Button
        onClick={() => setIsCandleChart(!isCandleChart)}
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
        type={isCandleChart ? "candlestick" : "line"}
        series={[
          {
            name: "Stock Price",
            data: seriesData,
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
          },
          fill: {
            type: "solid",
          },
          stroke: {
            curve: isCandleChart ? undefined : "smooth",
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
