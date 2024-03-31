import React, { useEffect, useState } from "react";
import { joinRoom, leaveRoom, receiveStockPriceList } from "../../lib/socket/socket";
import { useParams } from "react-router-dom";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "./RealtimePrice.css";

export default function RealtimePrice() {
  const [dataList, setDataList] = useState([]);
  const stockCode = useParams().stockCode;

  useEffect(() => {
    joinRoom(stockCode);

    return () => {
      leaveRoom(stockCode);
    };
  }, [stockCode]);

  useEffect(() => {
    receiveStockPriceList(stockCode, updateData);
  }, [dataList]);

  const updateData = (newData) => {
    setDataList(dataList.concat(newData));
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="stock-table-container">
      <ScrollMenu>
        <div>
          <table className="stock-table">
            <thead>
              <tr>
                <th>시간</th>
                <th>체결가</th>
                <th>등락률</th>
              </tr>
            </thead>
            <tbody>
              {dataList.reverse().map((data, index) => (
                <tr key={index}>
                  <td>
                    {data.time.toString().padStart(6, "0").replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3")}
                  </td>
                  <td>{numberWithCommas(data.close)}원</td>
                  <td className={data.ratio > 0 ? "positive" : data.ratio < 0 ? "negative" : "grey"}>
                    {data.ratio > 0 ? "+" : "-"}
                    {Math.abs(data.ratio)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollMenu>
    </div>
  );
}
