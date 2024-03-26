import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DailyPrice.css";
import { getDailyStock } from "../../lib/apis/dailystockApi";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

export default function DailyPrice() {
  const [dailyStockData, setDailyStockData] = useState(null); // 초기 상태를 null로 설정

  const stockCode = useParams().stockCode;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatAmount(amount) {
    if (amount >= 1e12) {
      return numberWithCommas((amount / 1e12).toFixed(1)) + "조원";
    } else if (amount >= 1e8) {
      return numberWithCommas((amount / 1e8).toFixed(0)) + "억원";
    } else {
      return numberWithCommas(amount);
    }
  }

  useEffect(() => {
    const fetchDailyStockData = async () => {
      try {
        const response = await getDailyStock(stockCode);
        setDailyStockData(response);
      } catch (error) {
        console.error("Error fetching daily stock data: ", error);
      }
    };

    fetchDailyStockData();
  }, []);

  return (
      <div className="stock-table-container">
        <ScrollMenu>
          <div>
            <table className="stock-table">
              <thead>
                <tr>
                  <th
                    style={{
                      position: "sticky",
                      left: "0",
                      zIndex: "1",
                      backgroundColor: "#fff",
                    }}
                  >
                    날짜
                  </th>
                  <th>종가</th>
                  <th>등락률</th>
                  <th>거래량(주)</th>
                  <th>거래대금</th>
                </tr>
              </thead>
              <tbody>
                {dailyStockData !== null &&
                  dailyStockData.map((item, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          position: "sticky",
                          left: "0",
                          zIndex: "1",
                          backgroundColor: "#fff",
                        }}
                      >
                        {item.stck_bsop_date.slice(4)}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {numberWithCommas(item.stck_clpr)}원
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {index < dailyStockData.length - 1 && (
                          <span
                            className={
                              item.stck_clpr -
                                dailyStockData[index + 1].stck_clpr >
                              0
                                ? "positive"
                                : item.stck_clpr -
                                    dailyStockData[index + 1].stck_clpr <
                                  0
                                ? "negative"
                                : "grey"
                            }
                          >
                            {item.stck_clpr -
                              dailyStockData[index + 1].stck_clpr >
                            0
                              ? "+"
                              : "-"}
                            {Math.floor(
                              (Math.abs(
                                item.stck_clpr -
                                  dailyStockData[index + 1].stck_clpr
                              ) /
                                dailyStockData[index + 1].stck_clpr) *
                                100 *
                                100
                            ) / 100}
                            %
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {numberWithCommas(item.acml_vol)}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {formatAmount(item.acml_tr_pbmn)}
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
