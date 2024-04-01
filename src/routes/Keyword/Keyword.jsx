import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getKeyword } from "../../lib/apis/keywordApi";

import WordCloud from "react-d3-cloud";
import styles from "./Keyword.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Modal from 'react-modal';

export default function Keyword() {
  const [keywords, setKeywords] = useState([]);
  const [top3Keywords, setTop3Keywords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(""); // 클릭된 단어 상태 추가
  const [isOpen, setIsOpen] = useState(false); // 모달 열림/닫힘 상태 추가
  const stockCode = useParams().stockCode;

  // 원형 스파이럴 함수
  const circleSpiral = (size) => {
    const e = size[0] / size[1];
    return (t) => {
      return [e * (t *= 0.1) * Math.cos(t), t * Math.sin(t)];
    };
  };
  // fontSize 매퍼 함수
  const fontSizeMapper = (word) => Math.log2(word.value) * 10;

  // rotate 함수: 여기서는 모든 단어를 0도로 설정합니다.
  const rotate = (word) => 0;

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

  // 단어 클릭 핸들러
  const handleWordClick = (word) => {
    setSelectedWord(word);
    setIsOpen(true); // 모달 열기
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setSelectedWord(null); // 선택된 단어 초기화
    setIsOpen(false);
  };

  // Google 뉴스 검색 결과 페이지 URL 생성 함수
  const generateGoogleNewsUrl = () => {
    return `https://search.naver.com/search.naver?ssc=tab.news.all&where=news&query=${stockCode}+${selectedWord}`;
  };

  return (
    <div className={styles.pageContainer}>
      <List style={{ marginTop: "10px" }}>
        {top3Keywords.map((keyword, index) => (
          <ListItem
            key={index}
            style={{
              backgroundColor: "#f0f0f0",
              margin: "10px 0",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "30px",
                textAlign: "center",
                backgroundColor:
                  index === 0
                    ? "#FFD700"
                    : index === 1
                    ? "#C0C0C0"
                    : index === 2
                    ? "#CD7F32"
                    : "#fff", // 순위에 따라 색상 지정
                borderRadius: "10px 0 0 10px", // 왼쪽 둥근 모서리만 적용
                marginRight: "20px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>{index + 1}</span>
            </div>
            <ListItemText
              primary={`${keyword.text}`}
              primaryTypographyProps={{
                style: { fontWeight: "bold", color: "#333" },
              }}
            />
          </ListItem>
        ))}
      </List>
      <div style={{ width: "90%", height: "800px", marginTop: "15px" }}>
        <WordCloud
          data={keywords}
          fontSize={fontSizeMapper}
          font="sans-serif"
          rotate={rotate}
          spiral={circleSpiral}
          padding={parseInt('8', 10)}
          onWordClick={(event, d) => handleWordClick(d.text)}
        />
      </div>


{/*       
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Google News Modal"
        className={styles.modal} // 모달에 적용할 CSS 클래스
        overlayClassName={styles.overlay} // 모달 배경에 적용할 CSS 클래스
      >
        <button onClick={closeModal}>Close</button>
        <a href={generateGoogleNewsUrl()} target="_blank" rel="noopener noreferrer">Open in new tab</a>
      </Modal> */}
    </div>
  );
}
