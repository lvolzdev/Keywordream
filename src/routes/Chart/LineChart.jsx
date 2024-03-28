import React, { useEffect, useRef } from "react";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

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

      // 큰 마커
      chart.addPointAnnotation({
        x,
        y,
        marker: {
          size: 6,
          fillColor: "transparent",
          strokeColor: "transparent",
          radius: 2,
        },
        id: "big-marker", // 큰 마커의 id 설정
        animation: {
          speed: 600,
          easing: "easeinout",
          animateGradually: {
            enabled: true,
            delay: 20,
          },
          opacity: {
            from: 1,
            to: 0.5,
          },
        },
      });

      // 작은 마커
      chart.addPointAnnotation({
        x,
        y,
        marker: {
          size: 3,
          fillColor: "#fe2f4d",
          strokeColor: "#fe2f4d",
          radius: 2,
        },
        id: "small-marker",
      });
    }
  }, [lineChart]);

  return (
    <div>
      <StyledApexChart
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

const StyledApexChart = styled(ApexChart)`
  .apexcharts-point-annotations circle#small-marker {
    animation: none;
  }

  .apexcharts-point-annotations circle {
    animation: blink 1s infinite alternate;
  }

  @keyframes blink {
    0% {
      fill: "#FFC4CC";
      stroke: transparent;
    }
    100% {
      fill: #fe2f4d;
      stroke: transparent;
    }
  }
`;

export default LineChartComponent;
