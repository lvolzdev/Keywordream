import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Tag from "./Tag";
import { getNewsList } from "../../lib/apis/newsApi";
import NewsList from "./NewsList";

export default function News() {
  const stockCode = useParams().stockCode
  const [tags, setTags] = useState(["tag1", "tag2", "tag3"])
  const [newsList, setNewsList] = useState([])

  useEffect(()=>{
    //TODO 주식코드에 따라서 키워드 & 뉴스 리스트 받아오기
    setNewsList(getNewsList(stockCode))
  },[stockCode])

  return(
    <div>
      <Tag tags={tags}/>
      <NewsList newsList={newsList} stockCode={stockCode}/>
    </div>
  );
}
