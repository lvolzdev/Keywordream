import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./info.css";
import { getFinStat } from "../../lib/apis/infoApi";
import dictionary from "./dict.js";
import caution from "./caution.png";
import FinancialItem from "./FinancialItem";

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
  const stockCode = useParams().stockCode;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await getFinStat(stockCode);
        setFinancialInfo(data[0]);
        console.log(data[0]);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };
    fetchInfo();
  }, [stockCode]);

  const showWordMeaning = (term) => {
    const meaning = dictionary.find((item) => item.term === term);

    if (meaning) {
      setWordMeaning(meaning);
    }
  };

  const toggleWordMeaning = () => {
    setFurtherExpanded(true);
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
      <br />

      <div className="box">
        <FinancialItem label="매출액" value={formatNumber(financialInfo?.saleAccount)} />
        <FinancialItem label="영업이익" value={formatNumber(financialInfo?.bsopPrti)} />
        <FinancialItem label="순이익" value={formatNumber(financialInfo?.thtrNtin)} />
      </div>
      <br />

      <div className="others">
        <div className="firstbox">
          <FinancialItem
            label="영업이익률"
            value={formatPercentage((financialInfo?.bsopPrti) / (financialInfo?.saleAccount) * 100)}
            onClick={() => showWordMeaning("영업이익률")}
          />
          <FinancialItem label="ROE" value={`${(financialInfo?.roeVal)}%`} onClick={() => showWordMeaning("ROE")} />
          <FinancialItem label="EPS" value={financialInfo?.eps} onClick={() => showWordMeaning("EPS")} />
          <FinancialItem label="BPS" value={financialInfo?.bps} onClick={() => showWordMeaning("BPS")} />
          <FinancialItem label="유보율" value={`${(financialInfo?.rsrvRate)}%`} onClick={() => showWordMeaning("유보율")} />
        </div>

        <div className="secondbox">
          <FinancialItem
            label="순이익률"
            value={formatPercentage((financialInfo?.thtrNtin) / (financialInfo?.saleAccount) * 100)}
            onClick={() => showWordMeaning("순이익률")}
          />
          <FinancialItem label="EV/EBITDA" value={`${(financialInfo?.evEbitda)}배`} onClick={() => showWordMeaning("EV/EBITDA")} />
          <FinancialItem label="PER" value={`${(financialInfo?.per)}배`} onClick={() => showWordMeaning("PER")} />
          <FinancialItem label="PBR" value={`${(financialInfo?.pbr)}배`} onClick={() => showWordMeaning("PBR")} />
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

                  <p><img src={caution} alt="ref"></img>{wordMeaning?.further}</p>
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
