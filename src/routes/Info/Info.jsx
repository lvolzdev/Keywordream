// Info.js

import React, { useEffect, useState } from "react";
import styles from "./info.css";
import { getFinStat } from "../../lib/apis/infoApi";
import dictionary from "./dict.js";
import caution from "./caution.png";

function formatNumber(number) {
  if (isNaN(number)) return "0";
  return parseFloat(number).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatPercentage(number) {
  if (isNaN(number)) return "0%";
  return (parseFloat(number) * 100).toFixed(2) + "%";
}

export default function Info() {
  const [financialInfo, setFinancialInfo] = useState(null);
  const [wordMeaning, setWordMeaning] = useState(null);
  const [furtherExpanded, setFurtherExpanded] = useState(false);

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

  const showWordMeaning = (term) => {
    const meaning = dictionary.find((item) => item.term === term);

    if (meaning) {
      setWordMeaning(meaning);
    }
  };

  const toggleWordMeaning = () => {
    setFurtherExpanded(true)

  };

  const hideWordMeaning = () => {
    setWordMeaning(""); // wordMeaning 상태를 초기화하여 word-meaning-container를 숨깁니다.
    setFurtherExpanded(false); // furtherExpanded 상태를 false로 설정하여 펼친 상태를 닫습니다.
  };

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
      <br />

      <div className="others">
        <div className="firstbox">
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("영업이익률")}>영업이익률</p>
            <p style={{ fontWeight: "bold", whiteSpace: 'pre-wrap' }}>
              {formatPercentage((financialInfo?.bsop_prti) / (financialInfo?.sale_account) * 100)}
            </p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("ROE")}>ROE</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.roe_val)}%</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("EPS")}>EPS</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.eps)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("BPS")}>BPS</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.bps)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("유보율")}>유보율</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.rsrv_rate)}%</p>
          </div>
        </div>

        <div className="secondbox">
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("순이익률")}>순이익률</p>
            <p style={{ fontWeight: "bold" }}>{formatPercentage((financialInfo?.thtr_ntin) / (financialInfo?.sale_account) * 100)}</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("EV/EBITDA")}>EV/EBITDA</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.ev_ebitda)}배</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("PER")}>PER</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.per)}배</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("PBR")}>PBR</p>
            <p style={{ fontWeight: "bold" }}>{(financialInfo?.pbr)}배</p>
          </div>
          <div className="take1" style={{ display: "flex", justifyContent: "space-between" }}>
            <p onClick={() => showWordMeaning("부채비율")}>부채비율</p>
            <p style={{ fontWeight: "bold" }}>{formatPercentage((financialInfo?.debt_rate) / (financialInfo?.capt_rate) * 100)}</p>
          </div>
        </div>
      </div>


      <br />
      {/* 설명 표시 부분 */}
      {wordMeaning && (
        <div className="word-meaning-container">
          <div className="word-meaning">
            <p>{wordMeaning?.meaning}</p>
            <button className="info" onClick={hideWordMeaning}>
              X
            </button>
            {wordMeaning?.further && (
              furtherExpanded ? (
                <div>
                  <div onClick={() => {
                    setFurtherExpanded(false)
                  }}>
                    ▲닫기
                  </div>

                  <p><img src={caution}></img>{wordMeaning?.further}</p>
                </div>
              ) : (
                <button className="further" onClick={toggleWordMeaning}>
                  ▼펼치기
                </button>
              )
            )}

          </div>
        </div>
      )}
    </div>
  );
}