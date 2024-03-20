import React, { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import { getKeyword } from "../../lib/apis/keywordApi";
import ReactWordcloud from 'react-wordcloud';

export default function Keyword() {
  const [keywords, setKeywords] = useState([]);
  const stockCode = useParams().stockCode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getKeyword(stockCode);
        console.log(response.data);
        // response에서 "word" 속성만을 추출하여 키워드 배열을 생성합니다.
        const keywordArray = response.data.map(item => ({
          text: item.word,
          value: item.cnt,
        }));
        setKeywords(keywordArray);
      } catch (error) {
        console.error("Error fetching keyword:", error);
      }
    };
    fetchData(); // 데이터 가져오는 함수 호출
  }, [stockCode]); // stockCode가 변경될 때마다 useEffect가 실행되도록 설정

  // 모든 단어의 크기를 일정하게 하기 위한 fontSizeMapper 함수 정의
  const fontSizeMapper = word => Math.sqrt(word.value) * 80;

   // options 객체를 사용하여 워드 클라우드의 모양을 변경합니다.
   const options = {
    // scale 값을 높여서 더 많은 단어가 모아지도록 합니다.
    scale: 10,
  };

  return(
    <div>
      <h2>Keywords for Stock {stockCode}</h2>
      <ReactWordcloud words={keywords} fontSizeMapper={fontSizeMapper} options={options}/>
    </div>
  )
}