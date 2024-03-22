import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getKeyword } from "../../lib/apis/keywordApi";
import WordCloud from "react-d3-cloud";
//import styles from "./Keyword.module.css";
import List from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Keyword() {
  const [keywords, setKeywords] = useState([]);
  const [top3Keywords, setTop3Keywords] = useState([]);
  const stockCode = useParams().stockCode;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getKeyword(stockCode);
        // response에서 "word" 속성만을 추출하여 키워드 배열을 생성합니다.
        const keywordArray = response.data.map((item) => ({
          text: item.word,
          value: item.cnt,
        }));
        setKeywords(keywordArray);
        const sortedKeywords = keywordArray
          .sort((a, b) => b.value - a.value)
          .slice(0, 3);
        setTop3Keywords(sortedKeywords); // 상위 3개 키워드 상태 업데이트
      } catch (error) {
        console.error("Error fetching keyword:", error);
      }
    };
    fetchData(); // 데이터 가져오는 함수 호출
  }, [stockCode]); // stockCode가 변경될 때마다 useEffect가 실행

  const fontSizeMapper = (word) => Math.sqrt(word.value) * 7;
  console.log(keywords.map(fontSizeMapper));
  return (
    <div>
      <List>
        {top3Keywords.map((keyword, index) => (
          <ListItem
            key={index}
            style={{
              backgroundColor: "#f0f0f0",
              margin: "10px 0",
              borderRadius: "10px",
            }}
          >
            <ListItemText
              primary={`${keyword.text}: ${keyword.value}`}
              primaryTypographyProps={{
                style: { fontWeight: "bold", color: "#333" },
              }}
            />
          </ListItem>
        ))}
      </List>
      <WordCloud data={keywords} fontSize={fontSizeMapper} font="sans-serif" />
    </div>
  );
}
