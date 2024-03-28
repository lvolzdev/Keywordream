import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getKeywords } from "../../lib/apis/Shinhan";
import "./DetailKeyword.css";

export default function DetailKeyword() {
  const { keyword } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchKeywordDetails = async () => {
      try {
        const response = await getKeywords();
        const keywordDetails = response.find(item => item.keyword === keyword);
        if (keywordDetails) {
          setDetails(keywordDetails.details);
        } else {
          setDetails([]);
          console.log(`No details found for the keyword '${keyword}'.`);
        }
      } catch (error) {
        console.error("Error fetching keyword details:", error);
      }
    };

    fetchKeywordDetails();
  }, [keyword]);

  return (
    <div>
      <div className="social">
        <div className="keywordtitleInfo">
          <div style={{ marginTop: "0", fontSize: "1.5rem", fontWeight: "bold" }}>🔑{keyword}</div>
          <p style={{ color: "#A0A0A0", fontsize: "1rem", marginBottom: "0.4rem" }}>종목명을 클릭하여 세부정보를 확인해보세요!</p>
        </div>

        {details.map((item, index) => (
          <div key={index} className="stock-item" style={{ backgroundColor: "#e7ecff", borderRadius: "10px" }}>
            <div className="detailtitle">
              <div className="stockInfo">
                <img
                  src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${item.stockCode}.png`} alt=""
                  className="stockImg"
                  onError={(e) => {
                    e.target.src =
                      "https://file.alphasquare.co.kr/media/images/stock_logo/ETF_230706.png";
                  }}
                />
                <div style={{ fontWeight: "bold", backgroundColor: "#FFFFFF", fontSize: "1.0rem", padding: "0.5rem 0.5rem", borderRadius: "10px" }}>
                  <Link to={`/detail/${item.stockCode}/keyword`}>{item.stockName}</Link>
                </div>
              </div>
              <div style={{ marginLeft: "auto", color: item.ratio < 0 ? 'blue' : item.ratio > 0 ? 'red' : 'inherit', marginRight: "0.2rem" }}>{item.ratio}%</div>
            </div>
            <br />
            <div style={{ marginLeft: "0.5rem" }}>{item.company_summary}</div>
          </div>
        ))}
      </div>
    </div >
  );
}
