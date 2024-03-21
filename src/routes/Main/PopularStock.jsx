import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMostViewed,
  fetchMostIncreased,
  fetchMostExchanged,
} from "../../lib/apis/Shinhan";
import Chart from "../../assets/image/Chart.png";
import styles from "./PopularStock.module.css";
import Tabs from "@mui/material/Tabs/";
import Tab from "@mui/material/Tab/";
import UnfilledHeart from "../../assets/image/UnfilledHeart.png";
import FilledHeart from "../../assets/image/FilledHeart.png";
import { crawlExtractKeyword } from "../../lib/apis/flask";

const PopularStock = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [myStock, setMyStock] = useState(["010140", "109610"]); // Initialize myStock array with favorite stock codes
  const [mostExchanged, setMostExchanged] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [mostIncreased, setMostIncreased] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exchangedData = await fetchMostExchanged();
        const viewedData = await fetchMostViewed();
        const increasedData = await fetchMostIncreased();

        setMostExchanged(exchangedData);
        setMostViewed(viewedData);
        setMostIncreased(increasedData);
        setLoading(false); // Set loading state to false after data fetching
      } catch (error) {
        console.error("인기종목 조회 실패:", error);
        setLoading(false); // Set loading state to false if there's an error
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const toggleFavoriteStock = (stockCode) => {
    setMyStock((prevStocks) => {
      if (prevStocks.includes(stockCode)) {
        return prevStocks.filter((code) => code !== stockCode);
      } else {
        return [...prevStocks, stockCode];
      }
    });
  };

  const navigateToDetail = async (stockName, stockCode) => {
    setLoading(true);
    const response = await crawlExtractKeyword(stockName, stockCode)
    // console.log(typeof response.status)
    setLoading(false);
    if(response.status === 200){
      navigate(`/detail/${stockCode}/keyword`);
    }
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
        classes={{
          indicator: styles.customTabIndicator,
        }}
        centered
      >
        <Tab
          label="거래량"
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
        <Tab
          label="조회수"
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
        <Tab
          label="주가상승률"
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
      </Tabs>
      <div className={styles.contentBox}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          (
            (tabIndex === 0 && mostExchanged) ||
            (tabIndex === 1 && mostViewed) ||
            (tabIndex === 2 && mostIncreased)
          ).map((stock, index) => (
            <div key={index} className={styles.stockContainer}>
              <div
                className={styles.exceptHeart}
                onClick={() => navigateToDetail(stock.stbd_nm, stock.stock_code)}
              >
                <div className={styles.rank}>{index + 1}</div>
                <img
                  src={
                    stock.stbd_nm.slice(0, 5) === "KODEX"
                      ? "https://file.alphasquare.co.kr/media/images/stock_logo/ETF_230706.png"
                      : `https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stock.stock_code}.png`
                  }
                  alt=""
                  className={styles.stockImg}
                  onError={(e) => {
                    e.target.src =
                      "https://file.alphasquare.co.kr/media/images/stock_logo/error.png";
                  }}
                />
                <div className={styles.verticalFlexContainer}>
                  <div className={styles.stockName}>{stock.stbd_nm}</div>
                  <div className={styles.stockPrice}>{stock.stock_price}원</div>
                </div>
              </div>
              <div
                className={styles.heartContainer}
                onClick={() => toggleFavoriteStock(stock.stock_code)} // Add onClick event to toggle favorite stock
              >
                <img
                  src={
                    myStock.includes(stock.stock_code)
                      ? FilledHeart
                      : UnfilledHeart
                  }
                  className={styles.heart}
                  alt="Heart"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularStock;
