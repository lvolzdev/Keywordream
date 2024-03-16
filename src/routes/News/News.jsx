import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Keyword from "./Keyword";
import { getNewsList } from "../../lib/apis/newsApi";
import NewsList from "./NewsList";

export default function News() {
  const stockCode = useParams().stockCode
  const [keywords, setKeywords] = useState(["키워드1", "키워드2", "키워드3"])
  const [newsList, setNewsList] = useState([])

  useEffect(()=>{
    //TODO 주식코드에 따라서 키워드 & 뉴스 리스트 받아오기
    setNewsList(getNewsList(stockCode))
  },[stockCode])

  return(
    <div>
      <Keyword keywords={keywords}/>
      <NewsList newsList={newsList} stockCode={stockCode}/>
    </div>
  );
}
