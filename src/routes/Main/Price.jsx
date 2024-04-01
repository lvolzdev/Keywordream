import React, { useState, useEffect } from "react";
import {
  joinRoom,
  leaveRoom,
  receiveStockPrice,
} from "../../lib/socket/socket";
import { fetchStockPrice } from "../../lib/apis/stockPrice";

export default function Price({ stockCode }) {
  const [price, setPrice] = useState(0);
  const [ratio, setRatio] = useState(0);
  useEffect(() => {
    joinRoom(stockCode);
    receiveStockPrice(stockCode, setPrice, setRatio);
    fetchStockPrice(stockCode).then((res) => {
      setPrice(res.price);
      setRatio(res.ratio);
    });
    return () => {
      leaveRoom(stockCode); // 해당 종목을 room에서 나가는 함수 호출
    };
  }, [stockCode]);

  const renderStyle = (ratio) =>
    ratio[0] === "-" ? { color: "#3283F7" } : { color: "#F04552" };

  return (
    <div style={{ display: "flex", gap: "1vh" }}>
      <div style={{ color: "#6b7783" }}>{price}원</div>
      <div style={renderStyle(ratio)}>{ratio}%</div>
    </div>
  );
}
