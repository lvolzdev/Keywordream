import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMostViewed,
  fetchMostIncreased,
  fetchMostExchanged,
} from "../../lib/apis/Shinhan";
import { fetchMyStock, addMyStock, deleteMyStock } from "../../lib/apis/mypage";
import Chart from "../../assets/image/Chart.png";
import styles from "./PopularStock.module.css";
import Tabs from "@mui/material/Tabs/";
import Tab from "@mui/material/Tab/";
import UnfilledHeart from "../../assets/image/UnfilledHeart.png";
import FilledHeart from "../../assets/image/FilledHeart.png";
import Price from "./Price";

const PopularStock = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [myStocks, setMyStocks] = useState([]); // Initialize myStock array with favorite stock codes
  const [mostExchanged, setMostExchanged] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);
  const [mostIncreased, setMostIncreased] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const nickName = localStorage.getItem("nickName");
  if (!nickName) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exchangedData, viewedData, increasedData] = await Promise.all([
          fetchMostExchanged(),
          fetchMostViewed(),
          fetchMostIncreased(),
        ]);
        setMostExchanged(exchangedData);
        setMostViewed(viewedData);
        setMostIncreased(increasedData);
        setLoading(false); // Set loading state to false after data fetching
      } catch (error) {
        console.error("인기종목 조회 실패:", error);
        setLoading(false); // Set loading state to false if there's an error
      }
      try {
        setMyStocks(await fetchMyStock(nickName));
      } catch (error) {
        return error;
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const toggleFavoriteStock = (stockCode) => {
    setMyStocks((prevStocks) => {
      console.log(prevStocks);
      if (prevStocks?.some((stock) => stock.stockCode === stockCode)) {
        deleteMyStock(nickName, stockCode);
        return prevStocks.filter((code) => code.stockCode !== stockCode);
      } else {
        addMyStock(nickName, stockCode);
        return [...prevStocks, { stockCode }];
      }
    });
  };

  const navigateToDetail = async (stockCode) => {
    navigate(`/detail/${stockCode}/keyword`);
  };

  return (
    <div className={styles.layout}>
      
      {/* Loading은 다음페이지로 넘어가기 위함 -> 어디에 넣든 상관없음 */}
      <div className={styles.container}>
        <img src={Chart} className={styles.chart} alt="" />
        <div className={styles.text}>실시간 인기 종목</div>
      </div>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="popular stock tabs"
        variant="fullWidth"
        classes={{
          indicator: styles.customTabIndicator,
        }}
      // centered
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
            <div key={stock.stock_code} className={styles.stockContainer}>
              <div
                className={styles.exceptHeart}
                onClick={() => navigateToDetail(stock.stock_code)}
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
                      "https://file.alphasquare.co.kr/media/images/stock_logo/ETF_230706.png";
                  }}
                />
                <div className={styles.verticalFlexContainer}>
                  <div className={styles.stockName}>{stock.stbd_nm}</div>
                  <Price
                    stockCode={stock.stock_code}
                    list={
                      (tabIndex === 0 && mostExchanged) ||
                      (tabIndex === 1 && mostViewed) ||
                      (tabIndex === 2 && mostIncreased)
                    }
                  />
                </div>
              </div>
              <div
                className={styles.heartContainer}
                onClick={() => toggleFavoriteStock(stock.stock_code)} // Add onClick event to toggle favorite stock
              >
                <img
                  src={
                    myStocks?.some(
                      (myStock) => myStock.stockCode === stock.stock_code
                    )
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
