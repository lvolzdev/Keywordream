import "./NewsDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsDetail } from "../../lib/apis/newsApi";
import { decodeHTMLEntities } from "../../components/decode/htmlToValue";

export default function NewsDetail() {
  const {newsId, stockCode} = useParams()
  const [data, setData] = useState({
    title : "",
    newsDate : "",
    press : "",
    isGood : null, //TODO 변수명 바뀔 수 있음
    content : ""
  })

  useEffect(() => {
    getNewsDetailData();
  }, [newsId])

  useEffect(() => {
    if(data.isGood === null){
      //TODO CHAT_GPT 실행????
    }
  }, [data.isGood])

  const getNewsDetailData = async () => {
    try{
      const newsTagTop3Data = await getNewsDetail(stockCode, newsId);
      setData(newsTagTop3Data);
    } catch(error){
      console.log("뉴스 디테일 페이지 오류: ",error)
    }
  }

  const eventStyle = {
    fontWeight:700,
    color: (data.event === "호재") ? 'red' : 'blue' 
  }

  return (
    <div className="newsDetailLayout">
      <div className="newsDetailTitle">{decodeHTMLEntities(data.title)}</div>
      <div className="newsDetailPressDate">
        <div className="newsDetailPress">{data.press}</div>
        <div className="newsDetailDate">{data.newsDate}</div>
      </div>
      <div className="newsDetailJudgment">
        {
          data.isGood !== null ? (
            <div>
              <img className="newsDetailChatGPTLogo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
              />
              <div>ChatGPT가 이 뉴스를 <span style={eventStyle}>{data.isGood}</span>로 판단하였습니다.</div>
            </div>
          ) : (
            <></>
          )
        }
      </div>
      <div dangerouslySetInnerHTML={{__html: data.content}}></div>
      <div className="newDetailFoot"></div>
    </div>
  )
}

