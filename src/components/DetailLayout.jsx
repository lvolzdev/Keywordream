import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import "./DetailLayout.css"; // CSS 파일 import
import styles from "../routes/Main/PopularStock.module.css";
import Tabs from "@mui/material/Tabs/";
import Tab from "@mui/material/Tab/";
import { Link } from "react-router-dom";
import { fetchStockInfo } from "../lib/apis/stockInfo";

export default function DetailLayout() {
  const [tabIndex, setTabIndex] = useState(0);
  const [stockName, setStockName] = useState("");
  const stockCode = useParams().stockCode;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStockInfo(stockCode); // stockCode를 인자로 전달하여 호출
        setStockName(data);
      } catch (error) {
        console.error("Error fetching stockInfo:", error);
      }
    };

    fetchData();
  }, [stockCode]); // stockCode가 변경될 때마다 호출
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="detail-container">
      {" "}
      {/* 클래스명을 추가하여 CSS 적용 */}
      <div className="detail-icon">
        <img
          src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${stockCode}.png`}
          alt=""
          className={styles.stockImg}
          onError={(e) => {
            e.target.src =
              "https://file.alphasquare.co.kr/media/images/stock_logo/ETF_230706.png";
          }}
          style={{ width: "3em", height: "3em", borderRadius: "30px" }}
        />
        <p style={{ marginLeft: "1rem", fontWeight: "bold" }}>{stockName}</p>
        <div className="detail-num">
          <p style={{ fontWeight: "bold" }}>74,300</p>
          <p style={{ fontSize: "0.7rem" }}>KRW</p>
          <p style={{ fontSize: "0.8rem", marginLeft: "2rem" }}>▲ 0.53%</p>
        </div>
      </div>
      <br />
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="popular stock tabs"
        classes={{
          indicator: styles.customTabIndicator,
        }}
      >
        <Tab
          label={<span style={{ fontWeight: "bold" }}>키워드</span>}
          component={Link}
          to={`/detail/${stockCode}/keyword`}
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
        <Tab
          label={<span style={{ fontWeight: "bold" }}>뉴스</span>}
          component={Link}
          to={`/detail/${stockCode}/news`}
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
        <Tab
          label={<span style={{ fontWeight: "bold" }}>차트</span>}
          component={Link}
          to={`/detail/${stockCode}/chart`}
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
        <Tab
          label={<span style={{ fontWeight: "bold" }}>정보</span>}
          component={Link}
          to={`/detail/${stockCode}/info`}
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
      </Tabs>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}
