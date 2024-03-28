import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs/";
import Tab from "@mui/material/Tab/";
import { Link } from "react-router-dom";
import styles from "../../routes/Main/PopularStock.module.css";
import stockimage from "../../components/005930.png";
import "./DailyPrice.css";
import { getDailyStock } from "../../lib/apis/dailystockApi";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

export default function DailyPrice() {
  const [tabIndex, setTabIndex] = useState(0);
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

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div className="detail-container">
      <div className="detail-icon">
        <img
          src={stockimage}
          alt="stock_image"
          style={{ width: "3em", height: "3em", borderRadius: "30px" }}
        />
        <p style={{ marginLeft: "1rem", fontWeight: "bold" }}>삼성전자</p>
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
          label={<span style={{ fontWeight: "bold" }}>일별 시세</span>}
          component={Link}
          to={`/detail/${stockCode}/chart/daily`}
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
        <Tab
          label={<span style={{ fontWeight: "bold" }}>실시간 시세</span>}
          component={Link}
          to={`/detail/${stockCode}/news`}
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
      </Tabs>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Container>
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
        </Container>
      </div>
    </div>
  );
}
