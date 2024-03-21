import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Tag from "./Tag";
import { getNewsList, getNewsTagTop3 } from "../../lib/apis/newsApi";
import NewsList from "./NewsList";

export default function News() {
  // const stockCode = useParams().stockCode
  const stockCode = "005930"
  const [tags, setTags] = useState(["tag1", "tag2", "tag3"])
  const [newsList, setNewsList] = useState([])

  useEffect(()=>{
    getNewsListData();
    getNewsTagTop3Data();
  },[stockCode])

  const getNewsListData = async () => {
    try{
      const newsListData = await getNewsList(stockCode);
      setNewsList(newsListData)
    } catch(error){
      console.log("뉴스 리스트 가져오기 실패: ", error);
    }
  }

  const getNewsTagTop3Data = async () => {
    try{
      const newsTagTop3Data = await getNewsTagTop3(stockCode);
      setTags(newsTagTop3Data);
    } catch(error){
      console.log("뉴스 상위 키워드 3개 가져오기 실패: ",error)
    }
  }

  return(
    <div>
      <Tag tags={tags}/>
      <NewsList newsList={newsList} stockCode={stockCode}/>
    </div>
  );
}
