import React from "react";
import styles from "./info.css";

export default function Info() {
  return (
    <div className={styles.layout}>
      <div className="fin" >
        <h3 style={{ margin: "1rem 1.5rem"}}> 재무 </h3>
        <p style={{ fontSize: "0.7rem", float: "right", marginRight: "1rem", marginTop: "0" }}> 2023년 12월 기준</p>
      </div>
      <br />
      <div className = "box">
        <div className= "take" style={{ marginLeft: "1.5rem" }}>
          <p>매출액</p>

        </div>


      </div>

    </div>
  );
}

