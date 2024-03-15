import React, { useEffect, useState } from "react";
import styles from "./info.css";
import { getFinStat } from "../../lib/apis/infoApi";

// 숫자를 천 단위마다 쉼표를 넣은 형식으로 변환하는 함수
function formatNumber(number) {
  if (isNaN(number)) return "0"; // number가 NaN이면 "0" 반환
  // 소수점 이하 자리수를 버리고 정수부에 쉼표를 넣음
  return parseFloat(number).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 소수점 두 자리까지 포맷하고 '%'를 더하는 함수
function formatPercentage(number) {
  if (isNaN(number)) return "0%"; // number가 NaN이면 "0%" 반환
  return (parseFloat(number) * 100).toFixed(2) + "%";
}

// Info 컴포넌트
export default function Info() {
  const [financialInfo, setFinancialInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getFinStat();
        setFinancialInfo(data);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className={styles.layout}>
      <br />
      <div className="fin" style={{ overflow: "auto" }}>
        <h3 style={{ margin: "0rem 1.5rem" }}> 재무 </h3>
        <p style={{ fontSize: "0.7rem", float: "right", margin: "0 1rem" }}> 2023년 기준[연간]</p>

      </div>
      <p style={{ fontSize: "0.7rem", float: "right", margin: "0.2rem 1rem", color: "#A0A0A0" }}> 단위: 억원</p>
      <br />

      <div className="box">
        <div className="take" style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem", marginRight: "2rem" }}>
          <p>매출액</p>
          <p>{formatNumber(financialInfo?.sale_account)}</p>
        </div>
        <div className="take" style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem", marginRight: "2rem" }}>
          <p>영업이익</p>
          <p>{formatNumber(financialInfo?.bsop_prti)}</p>
        </div>
        <div className="take" style={{ display: "flex", justifyContent: "space-between", marginLeft: "2rem", marginRight: "2rem" }}>
          <p>순이익</p>
          <p>{formatNumber(financialInfo?.thtr_ntin)}</p>
        </div>
      </div>

      <div className="others">
        <div className="firstbox">
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>영업이익률</p>
            <p>{formatPercentage((financialInfo?.bsop_prti) / (financialInfo?.sale_account) * 100)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>ROE</p>
            <p>{(financialInfo?.roe_val)}%</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>EPS</p>
            <p>{(financialInfo?.eps)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>BPS</p>
            <p>{(financialInfo?.bps)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>유보율</p>
            <p>{(financialInfo?.rsrv_rate)}%</p>
          </div>
          
        </div>

        <div className="secondbox">
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>순이익률</p>
            <p>{formatPercentage((financialInfo?.thtr_ntin) / (financialInfo?.sale_account) * 100)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>EV/EBITDA</p>
            <p>{(financialInfo?.ev_ebitda)}배</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>PER</p>
            <p>{(financialInfo?.per)}배</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>PBR</p>
            <p>{(financialInfo?.pbr)}배</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p>부채비율</p>
            <p>{(financialInfo?.lblt_rate)}%</p>
          </div>
        </div>
      </div>
    </div >
  );
}