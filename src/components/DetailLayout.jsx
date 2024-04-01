import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useParams } from "react-router-dom";
import "./DetailLayout.css"; // CSS 파일 import
import styles from "../routes/Main/PopularStock.module.css";
import { fetchStockInfo } from "../lib/apis/stockInfo";
import { joinRoom, leaveRoom, receiveStockPrice } from "../lib/socket/socket";

export default function DetailLayout() {
  const [stockName, setStockName] = useState("");
  const [stockPrice, setStockPrice] = useState(0);
  const [ratio, setRatio] = useState(0);
  const stockCode = useParams().stockCode;

  useEffect(() => {
    joinRoom(stockCode);
    receiveStockPrice(stockCode, setStockPrice, setRatio);
    const fetchData = async () => {
      try {
        const data = await fetchStockInfo(stockCode); // stockCode를 인자로 전달하여 호출
        console.log(data);
        setStockName(data.stockName.name);
        setStockPrice(data.stockPrice.price);
        setRatio(data.stockPrice.ratio);
      } catch (error) {
        console.error("Error fetching stockInfo:", error);
      }
    };

    fetchData();

    return () => {
      leaveRoom(stockCode); // 해당 종목을 room에서 나가는 함수 호출
    };
  }, [stockCode]); // stockCode가 변경될 때마다 호출

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
          style={{
            width: "3em",
            height: "3em",
            borderRadius: "30px",
            marginLeft: "0.5em",
          }}
        />
        <p
          className="detail-stockName"
          style={{ marginLeft: "1rem", fontWeight: "bold" }}
        >
          {stockName}
        </p>
        <div className="detail-num">
          <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>{stockPrice}</p>
          <p style={{ fontSize: "0.7rem" }}>KRW</p>
          <p
            style={{
              fontSize: "0.8rem",
              marginLeft: "1rem",
              color: ratio >= 0 ? "#F04552" : "#3283F7",
            }}
          >
            {ratio >= 0 ? "▲" : "▼"}
          </p>
          <p style={{ fontSize: "0.8rem", marginLeft: "0.1rem" }}> {ratio}%</p>
        </div>
      </div>
      <br />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
