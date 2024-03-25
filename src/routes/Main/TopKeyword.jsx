import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getKeywords } from "../../lib/apis/Shinhan";
import Keyword from "./keyword.png";
import styles from "./PopularStock.module.css";

export default function TopKeyword() {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await getKeywords();
        // response는 객체이므로 그 안에 있는 키워드 정보를 뽑아냅니다.
        const keywordList = response.map(item => item.keyword);
        setKeywords(keywordList);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    };

    fetchKeywords();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <img src={Keyword} className={styles.chart} alt="" />
        <div className={styles.text}>인기 키워드</div>
      </div>
      <br />
      <div className={styles.keywordRow}>
        {keywords.map((keyword, index) => (
          <div key={index} className={styles.keywordItem}>
            <Link to={`/keyword/${keyword}`}>{keyword}</Link>
          </div>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
}
