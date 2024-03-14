import React from "react";
import Fire from "../../assets/image/Fire.png";
import styles from "./HotTopic.module.css";
export default function HotTopic() {
  return (
    <div>
      <div className={styles.container}>
        <img src={Fire} className={styles.fire} alt="" />
        <div className={styles.text}>인기 급상승 검색어</div>
      </div>
      <div className={styles.contentBox}>1 세계 여성의 날 2K+</div>
    </div>
  );
}
