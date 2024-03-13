import React, { useEffect, useState } from "react";
import Chart from "../../assets/image/Chart.png";
import styles from "./PopularStock.module.css";
import Tabs from "@mui/material/Tabs/";
import Tab from "@mui/material/Tab/";

const PopularStock = () => {
  const [mostExchanged, setMostExchanged] = useState([]);
  const [mostIncreased, setMostIncreased] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocks = [
          {
            rank: 1,
            stbd_nm: "삼성중공업",
            stock_code: "010140",
          },
          {
            rank: 2,
            stbd_nm: "에스코넥",
            stock_code: "096630",
          },
          {
            rank: 3,
            stbd_nm: "서남",
            stock_code: "294630",
          },
          {
            rank: 4,
            stbd_nm: "에스와이",
            stock_code: "109610",
          },
          {
            rank: 5,
            stbd_nm: "이미지스",
            stock_code: "115610",
          },
        ];
        const stocks2 = [
          {
            rank: 2,
            stbd_nm: "에스코넥",
            stock_code: "096630",
          },
          {
            rank: 3,
            stbd_nm: "서남",
            stock_code: "294630",
          },
          {
            rank: 1,
            stbd_nm: "삼성중공업",
            stock_code: "010140",
          },
          {
            rank: 5,
            stbd_nm: "이미지스",
            stock_code: "115610",
          },
          {
            rank: 4,
            stbd_nm: "에스와이",
            stock_code: "109610",
          },
        ];
        setMostExchanged(stocks);
        setMostViewed(stocks2);
        setMostIncreased(stocks);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <img src={Chart} className={styles.chart} alt="" />
        <div className={styles.text}>실시간 인기 종목</div>
      </div>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="popular stock tabs"
      >
        <Tab label="거래량" />
        <Tab label="조회수" />
        <Tab label="주가상승률" />
      </Tabs>
      <div className={styles.contentBox}>
        {(
          (tabIndex === 0 && mostExchanged) ||
          (tabIndex === 1 && mostViewed) ||
          (tabIndex === 2 && mostIncreased)
        ).map((stock, index) => (
          <div key={index}>{`${index + 1}. ${stock.stbd_nm} (${
            stock.stock_code
          })`}</div>
        ))}
      </div>
    </div>
  );
};

export default PopularStock;
