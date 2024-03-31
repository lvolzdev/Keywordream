import React, { useEffect, useState } from "react";
import { Box, MenuItem, Select, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Mypage.module.css";
import { fetchMyStock, addMyStock, deleteMyStock } from "../../lib/apis/mypage";
import UnfilledHeart from "../../assets/image/UnfilledHeart.png";
import FilledHeart from "../../assets/image/FilledHeart.png";
import Sorting from "../../assets/image/Sorting.png";

export default function Mypage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [myStocks, setMyStocks] = useState([]);
  const [order, setOrder] = useState(0);
  const navigate = useNavigate();
  const nickName = localStorage.getItem("nickName");
  if (!nickName) {
    navigate("/login");
  }

  useEffect(() => {
    fetchMyStock(nickName)
      .then((res) => {
        const stocks = res.map((stock) => ({
          ...stock,
          deleted: false,
        }));
        setMyStocks(stocks);
      })
      .catch((error) => {
        console.error("Error fetching my stocks:", error);
      });
  }, [nickName]);

  const categories = ["KOSPI", "KOSDAQ"];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const navigateToDetail = (stockCode) => {
    navigate(`/detail/${stockCode}/keyword`);
  };

  const toggleFavoriteStock = (stock) => {
    const nickName = localStorage.getItem("nickName");
    if (!nickName) {
      navigate("/login");
    } else {
      setMyStocks((prevStocks) => {
        if (!stock.deleted) {
          deleteMyStock(nickName, stock.stockCode);
          return prevStocks.map((prevStock) =>
            prevStock.stockCode === stock.stockCode
              ? { ...prevStock, deleted: true }
              : prevStock
          );
        } else {
          addMyStock(nickName, stock.stockCode);
          return prevStocks.map((prevStock) =>
            prevStock.stockCode === stock.stockCode
              ? { ...prevStock, deleted: false }
              : prevStock
          );
        }
      });
    }
  };

  const toggleOrder = () => {
    setOrder(1 - order);
  };

  const sortedStocks = myStocks
    .filter((stock) =>
      selectedCategory === "전체"
        ? true
        : stock.market === (selectedCategory === "KOSPI" ? "1" : "2")
    )
    .sort((a, b) =>
      order === 0
        ? a.name.localeCompare(b.name)
        : a.stockCode.localeCompare(b.stockCode)
    );

  return (
    <Box className={styles.container}>
      <div>
        <span className={styles.name}>{nickName}</span>
        <span className={styles.title}>님이 찜한 종목</span>
      </div>
      <Box>
        <div className={styles.filterContainer}>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            className={styles.dropdown}
          >
            <MenuItem value="전체">전체</MenuItem>
            {categories.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <div
            variant="outlined"
            className={styles.sortingContainer}
            onClick={toggleOrder}
          >
            <img src={Sorting} alt="정렬" className={styles.sortImg} />
            <div className={styles.sort}>
              {order === 0 ? "이름순" : "코드순"}
            </div>
          </div>
        </div>
        <div className={styles.contentBox}>
          {sortedStocks.map((stock, index) => (
            <div key={stock.stockCode} className={styles.stockContainer}>
              <div
                className={styles.exceptHeart}
                onClick={() => navigateToDetail(stock.stockCode)}
              >
                <div className={styles.rank}>{index + 1}</div>
                <img
                  src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stock.stockCode}.png`}
                  alt=""
                  className={styles.stockImg}
                  onError={(e) => {
                    e.target.src =
                      "https://file.alphasquare.co.kr/media/images/stock_logo/ETF_230706.png";
                  }}
                />
                <div className={styles.verticalFlexContainer}>
                  <div className={styles.stockName}>{stock.name}</div>
                  <div className={styles.detailContainer}>
                    <div className="">{stock.stockCode}</div>
                    <div className="">
                      {stock.market === 1 ? "KOSPI" : "KOSDAQ"}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={styles.heartContainer}
                onClick={() => toggleFavoriteStock(stock)}
              >
                <img
                  src={stock.deleted ? UnfilledHeart : FilledHeart}
                  className={styles.heart}
                  alt="Heart"
                />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
}
