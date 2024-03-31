import React from "react";
import styles from "./NewsList.module.css";
import { Link } from "react-router-dom";
import { decodeHTMLEntities } from "../../components/decode/htmlToValue";
import NoImg from '../../assets/image/no_img.png'

export default function NewsList({ newsList, stockCode }) {
  
  return (
    <div className={styles.layout}>
      {newsList.map((news) => {
        return (
          <Link to={`/detail/${stockCode}/news/${news.newsId}`} className={styles.link} key={news.newsId}>
            <div className={styles.container}>
              <div className={styles.leftContainer}>
                <div className={styles.title}>{decodeHTMLEntities(news.title)}</div>
                <div className={styles.pressDate}>
                  <div>{news.press}</div>
                  <div>{news.newsDate}</div>
                </div>
              </div>
              <img 
                src={news.imgUrl} 
                alt="" 
                className={styles.newsImg} 
                onError={(e) => {
                  e.currentTarget.src = NoImg
                }}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
