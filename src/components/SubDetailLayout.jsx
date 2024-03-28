import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styles from "../routes/Main/PopularStock.module.css";
import { crawlExtractKeyword } from "../lib/apis/flask";
import Loading from "./Loading";
import { Container } from "react-bootstrap";

export default function SubDetailLayout() {
  const [tabIndex, setTabIndex] = useState(0);
  const {pathname} = useLocation();
  const stockCode = useParams().stockCode;
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(()=>{
    updateNewsAndKeyword(stockCode)
  }, [stockCode])

  const updateNewsAndKeyword = async (stockCode) => {
    setLoading(true);
    const response = await crawlExtractKeyword(stockCode)
    if(response.status !== 200){
      console.log("최근 뉴스 크롤링 실패! DB에 저장된 데이터를 가져옵니다.")
    }
    setLoading(false);
  }

  useEffect(()=>{
    if(pathname.endsWith("news")){
      setTabIndex(1);
    } else if(pathname.endsWith("chart")){
      setTabIndex(2);
    } else if(pathname.endsWith("info")){
      setTabIndex(3);
    }
  },[pathname])

  return (
    <div>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="popular stock tabs"
        variant="fullWidth"
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
      {loading ? (
        <Loading />
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Container>
            <Outlet />
          </Container>
        </div>
      )}
    </div>
  );
}
