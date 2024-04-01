import "./NewsDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsDetail } from "../../lib/apis/newsApi";
import { decodeHTMLEntities } from "../../components/decode/htmlToValue";
import { getSentimentResult } from "../../lib/apis/flask";

export default function NewsDetail() {
  const { newsId, stockCode } = useParams();
  const [data, setData] = useState({
    title: "",
    newsDate: "",
    press: "",
    isGood: null,
    content: "",
  });

  useEffect(() => {
    getNewsDetailData();
  }, [newsId]);

  useEffect(() => {
    if (data.isGood === null && data.title !== "") {
      getSentimentResult(newsId).then((res) => {
        const isGood = res.data.isGood;
        setData({
          ...data,
          isGood: parseInt(isGood),
        });
      });
    }
  }, [data, data.isGood, newsId]);

  const getNewsDetailData = async () => {
    try {
      const newsDetail = await getNewsDetail(stockCode, newsId);
      setData(newsDetail);
    } catch (error) {
      console.log("뉴스 디테일 페이지 오류: ", error);
    }
  };

  const eventStyle = {
    fontWeight: 700,
    color: data.isGood === 1 ? "red" : "blue ", //호재(좋은) : 빨간색
  };

  return (
    <div className="newsDetailLayout">
      <div className="newsDetailTitle">{decodeHTMLEntities(data.title)}</div>
      <div className="newsDetailPressDate">
        <div className="newsDetailPress">{data.press}</div>
        <div className="newsDetailDate">{data.newsDate}</div>
      </div>
      <div className="newsDetailJudgment">
        {data.isGood !== null ? (
          <>
            <img
              className="newsDetailChatGPTLogo"
              src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
            />
            <div>
              Kr-FinBert가 이 뉴스를{" "}
              <span style={eventStyle}>
                {data.isGood === 1 ? "호재" : "악재"}
              </span>
              로 판단하였습니다.
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      <div className="newDetailFoot"></div>
    </div>
  );
}
