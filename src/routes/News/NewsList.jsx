import React from "react";
import styles from "./NewsList.module.css";
import { Link } from "react-router-dom";

export default function NewsList({ newsList, stockCode }) {
  return (
    <div className={styles.layout}>
      {newsList.map((news) => {
        return (
          <Link to={`/detail/${stockCode}/news/${news.id}`} className={styles.link}>
            <div key={news.id} className={styles.container}>
              <div className={styles.leftContainer}>
                <div className={styles.title}>{news.title}</div>
                <div className={styles.pressDate}>
                  <div>{news.press}</div>
                  <div>{news.date}</div>
                </div>
              </div>
              <img src={news.imgUrl} alt="이미지" className={styles.newsImg} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
