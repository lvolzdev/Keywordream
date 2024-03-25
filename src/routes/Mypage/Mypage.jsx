import React, { useEffect, useState } from "react";
import { Box, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Mypage.module.css";
import { fetchMyStock } from "../../lib/apis/mypage";
import UnfilledHeart from "../../assets/image/UnfilledHeart.png";
import FilledHeart from "../../assets/image/FilledHeart.png";

export default function Mypage() {
  const [selectedCategory, setSelectedCategory] = useState("업종(전체)");
  const [myStocks, setMyStocks] = useState([
    {
      name: "삼성전자",
      section: "건설",
      market: "코스피",
      updated: "2023-01-04",
    },
    {
      name: "삼성전자",
      section: "건설",
      market: "코스피",
      updated: "2023-01-04",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNickName = localStorage.getItem("nickName");
    if (!storedNickName) {
      navigate("/login");
    } else {
      const myStock = fetchMyStock(storedNickName);
      // setMyStocks(myStock);
    }
  }, [navigate]);

  const categories = [
    "건설",
    "건설업",
    "광업",
    "금속",
    "금융",
    "기계",
    "기계·장비",
    "기타금융",
    "기타서비스",
    "기타제조",
    "기타제조업",
    "농업, 임업 및 어업",
    "디지털컨텐츠",
    "반도체",
    "방송서비스",
    "보험",
    "비금속",
    "비금속광물",
    "서비스업",
    "섬유·의류",
    "섬유의복",
    "소프트웨어",
    "숙박·음식",
    "오락·문화",
    "운송",
    "운송장비·부품",
    "운수장비",
    "운수창고업",
    "유통",
    "유통업",
    "은행",
    "음식료·담배",
    "음식료품",
    "의료·정밀기기",
    "의료정밀",
    "의약품",
    "인터넷",
    "일반전기전자",
    "전기·가스·수도",
    "전기가스업",
    "전기전자",
    "정보기기",
    "제약",
    "종이·목재",
    "종이목재",
    "증권",
    "철강금속",
    "출판·매체복제",
    "컴퓨터서비스",
    "코스닥",
    "코스피",
    "통신서비스",
    "통신업",
    "통신장비",
    "화학",
    "IT부품",
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const navigateToDetail = async (stockCode) => {
    navigate(`/detail/${stockCode}/keyword`);
  };

  const toggleFavoriteStock = (stockCode) => {
    setMyStocks((prevStocks) => {
      if (prevStocks.includes(stockCode)) {
        return prevStocks.filter((code) => code !== stockCode);
      } else {
        return [...prevStocks, stockCode];
      }
    });
  };

  return (
    <Box className={styles.container}>
      <div className={styles.title}>내가 찜한 종목</div>
      <Box>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          className={styles.dropdown}
        >
          <MenuItem value="업종(전체)">업종(전체)</MenuItem>
          {categories.map((item) => {
            return (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        <div className={styles.contentBox}>
          {myStocks
            .filter((stock) => stock.section === selectedCategory)
            .map((stock, index) => (
              <div key={stock.name} className={styles.stockContainer}>
                <div
                  className={styles.exceptHeart}
                  onClick={() =>
                    navigateToDetail(stock.stbd_nm, stock.stock_code)
                  }
                >
                  <div className={styles.rank}>{index + 1}</div>
                  <img
                    src={
                      stock.stbd_nm?.slice(0, 5) === "KODEX"
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
                  </div>
                </div>
                <div
                  className={styles.heartContainer}
                  onClick={() => toggleFavoriteStock(stock.stock_code)} // Add onClick event to toggle favorite stock
                >
                  <img
                    src={
                      myStocks.includes(stock.stock_code)
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
      </Box>
    </Box>
  );
}
