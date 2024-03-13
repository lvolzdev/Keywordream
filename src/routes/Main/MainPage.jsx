import * as React from "react";
import HotTopic from "./HotTopic";
import styles from "./MainPage.module.css";
import PopularStock from "./PopularStock";
export default function MainPage() {
  return (
    <div className={styles.layout}>
      <HotTopic />
      <PopularStock />
    </div>
  );
}
