import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styles from './MarketPriceLayout.module.css'

export default function MarketPriceLayout() {
  const [tabIndex, setTabIndex] = useState(0);
  const {pathname} = useLocation();
  const stockCode = useParams().stockCode;

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(()=>{
    if(pathname.endsWith("realtime")){
      setTabIndex(1);
    } 
  },[pathname])

  return (
    <div>
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
          to={`/detail/${stockCode}/chart/market/daily`}
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
        <Tab
          label={<span style={{ fontWeight: "bold" }}>실시간 시세</span>}
          component={Link}
          to={`/detail/${stockCode}/chart/market/realtime`}
          classes={{
            root: styles.customTextColor,
            selected: styles.customTabSelected,
          }}
        />
      </Tabs>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
