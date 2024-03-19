import "./NewsDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsDetail } from "../../lib/apis/newsApi";

export default function NewsDetail() {
  const newsId = useParams().newsId
  const [data, setData] = useState({
    title : "",
    date : "",
    press : "",
    event : "", //TODO 변수명 바뀔 수 있음
    content : ""
  })

  useEffect(() => {
    setData(getNewsDetail(newsId))
  }, [newsId])

  const eventStyle = {
    fontWeight:700,
    color: (data.event === "호재") ? 'red' : 'blue' 
  }

  return (
    <div className="newsDetailLayout">
      <div className="newsDetailTitle">{data.title}</div>
      <div className="newsDetailPressDate">
        <div className="newsDetailPress">{data.press}</div>
        <div className="newsDetailDate">{data.date}</div>
      </div>
      <div className="newsDetailJudgment">
        <img
          className="newsDetailChatGPTLogo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png"
        />
        <div>ChatGPT가 이 뉴스를 <span style={eventStyle}>{data.event}</span>로 판단하였습니다.</div>
      </div>
      <div dangerouslySetInnerHTML={{__html: data.content}}></div>
    </div>
  )
}

