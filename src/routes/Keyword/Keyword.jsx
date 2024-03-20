import React, { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import { getKeyword } from "../../lib/apis/keywordApi";
import  WordCloud  from "react-d3-cloud";
import styles from "./Keyword.module.css";

export default function Keyword() {
  const [keywords, setKeywords] = useState([]);
  const stockCode = useParams().stockCode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getKeyword(stockCode);
        console.log(response.data)
        // response에서 "word" 속성만을 추출하여 키워드 배열을 생성합니다.
        const keywordArray = (response.data).map(item => ({
          text: item.word,
          value: item.cnt
        }));
        console.log(keywordArray);
        setKeywords(keywordArray);
        
      } catch (error) {
        console.error("Error fetching keyword:", error);
      }
    };
    fetchData(); // 데이터 가져오는 함수 호출
  }, [stockCode]); // stockCode가 변경될 때마다 useEffect가 실행

  //<h2>Keywords for Stock {stockCode}</h2>

  const fontSizeMapper = (word) => Math.sqrt(word.value) * 7;
  console.log(keywords.map(fontSizeMapper));
  return(
    <div>
      <div className={styles.rank}>
      
      </div>
      <WordCloud
        data={keywords} 
        fontSize={fontSizeMapper}
        font="sans-serif"
      />
    </div>
  )
}