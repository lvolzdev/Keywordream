import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "../../assets/image/Chart.png";
import styles from "./PopularStock.module.css";
import Tabs from "@mui/material/Tabs/";
import Tab from "@mui/material/Tab/";
import UnfilledHeart from "../../assets/image/UnfilledHeart.png";
import FilledHeart from "../../assets/image/FilledHeart.png";

const PopularStock = () => {
  const [mostExchanged, setMostExchanged] = useState([]);
  const [mostIncreased, setMostIncreased] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [myStock, setMyStock] = useState(["010140", "109610"]); // Initialize myStock array with favorite stock codes
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stocks = [
          {
            rank: 1,
            stbd_nm: "삼성중공업",
            stock_code: "010140",
            stock_price: "12345",
          },
          {
            rank: 2,
            stbd_nm: "에스코넥",
            stock_code: "096630",
            stock_price: "54321",
          },
          {
            rank: 3,
            stbd_nm: "서남",
            stock_code: "294630",
            stock_price: "1323",
          },
          {
            rank: 4,
            stbd_nm: "에스와이",
            stock_code: "109610",
            stock_price: "54321",
          },
          {
            rank: 5,
            stbd_nm: "이미지스",
            stock_code: "115610",
            stock_price: "62463",
          },
        ];
        const stocks2 = [
          {
            rank: 2,
            stbd_nm: "에스코넥",
            stock_code: "096630",
            stock_price: "62463",
          },
          {
            rank: 3,
            stbd_nm: "서남",
            stock_code: "294630",
            stock_price: "12415",
          },
          {
            rank: 1,
            stbd_nm: "삼성중공업",
            stock_code: "010140",
            stock_price: "65416",
          },
          {
            rank: 5,
            stbd_nm: "이미지스",
            stock_code: "115610",
            stock_price: "62463",
          },
          {
            rank: 4,
            stbd_nm: "에스와이",
            stock_code: "109610",
            stock_price: "1343",
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

  const toggleFavoriteStock = (stockCode) => {
    if (myStock.includes(stockCode)) {
      setMyStock(myStock.filter((code) => code !== stockCode));
    } else {
      setMyStock([...myStock, stockCode]);
    }
  };

  const navigateToDetail = (stockCode) => {
    navigate(`/detail/${stockCode}/keyword`);
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
        {(
          (tabIndex === 0 && mostExchanged) ||
          (tabIndex === 1 && mostViewed) ||
          (tabIndex === 2 && mostIncreased)
        ).map((stock, index) => (
          <div key={index} className={styles.stockContainer}>
            <div
              className={styles.exceptHeart}
              onClick={() => navigateToDetail(stock.stock_code)}
            >
              <div className={styles.rank}>{index + 1}</div>
              <img
                src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stock.stock_code}.png`}
                alt={stock.stbd_nm}
                className={styles.stockImg}
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
        ))}
      </div>
    </div>
  );
};

export default PopularStock;
