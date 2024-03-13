import React from "react";
import RunningBear from "../../assets/image/RunningBear.gif";
import Logo from "../../assets/image/logo.png";
import styles from "./Landing.module.css";
import Button from "@mui/material/Button";

export default function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="" className={styles.logo} />
      </div>
      <div className={styles.bearContainer}>
        <img src={RunningBear} alt="" className={styles.bear} />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" href="/main" className={styles.button}>
          시작하기
        </Button>
      </div>
    </div>
  );
}
