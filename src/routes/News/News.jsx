import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Tag from "./Tag";
import { getKeywordNewsList, getNewsList, getNewsTagTop3 } from "../../lib/apis/newsApi";
import NewsList from "./NewsList";

export default function News() {
  const stockCode = useParams().stockCode
  // const stockCode = "005930"
  const [tags, setTags] = useState([])
  const [newsList, setNewsList] = useState([])

  useEffect(()=>{
    getNewsListData();
    getNewsTagTop3Data();
  },[stockCode])

  const getNewsListData = async () => {
    try{
      let newsListData = await getNewsList(stockCode);
      if(newsListData === "") newsListData = [];
      setNewsList(newsListData)
    } catch(error){
      console.log("뉴스 리스트 가져오기 실패: ", error);
    }
  }

  const changeNewsList = async (keyword) => {
    console.log(keyword)
    try{
      let newsListData = await getKeywordNewsList(stockCode, keyword);
      if(newsListData === "") newsListData = [];
      console.log(newsListData)
      setNewsList(newsListData)
    } catch(error){
      console.log("키워드 뉴스 리스트 가져오기 실패: ", error);
    }
  }

  const getNewsTagTop3Data = async () => {
    try{
      let newsTagTop3Data = await getNewsTagTop3(stockCode);
      if(newsTagTop3Data === "") newsTagTop3Data = []
      setTags(newsTagTop3Data);
    } catch(error){
      console.log("뉴스 상위 키워드 3개 가져오기 실패: ",error)
    }
  }

  return(
    <div>
      <Tag tags={tags} changeNewsList={changeNewsList}/>
      <NewsList newsList={newsList} stockCode={stockCode}/>
    </div>
  );
}
