import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getKeywords } from "../../lib/apis/Shinhan";
import "./DetailKeyword.css"; // CSS 파일 import

export default function DetailKeyword() {
  const { keyword } = useParams();
  console.log(keyword);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchKeywordDetails = async () => {
      try {
        const response = await getKeywords();
        // 주어진 키워드에 해당하는 상세 정보를 찾음
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
      <div className="social"> {/* 새로운 클래스명 container 추가 */}
        <h2>🔑{keyword}</h2>
        <table>
          <thead>
            <tr>
              <th>종목명</th>
              <th>등락률</th>
              <th>기업개요</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index}>
                <td>{item.stockName}</td>
                {/* 등락률이 음수일 때는 파란색, 양수일 때는 빨간색으로 글자색 변경 */}
                <td style={{ color: item.ratio < 0 ? 'blue' : item.ratio > 0 ? 'red' : 'inherit' }}>{item.ratio}%</td>
                <td>{item.company_summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
